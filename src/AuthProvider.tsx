import { FirebaseError } from "firebase/app";
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./services/firebase";

interface Props {
  children: React.ReactNode;
}

type UserState =
  | { type: "loading" }
  | { type: "success"; user: User }
  | { type: "error"; error: Error }
  | null;

interface AuthContextTypes {
  login: (data: { email: string; password: string }) => Promise<User | Error>;
  register: (data: {
    email: string;
    password: string;
  }) => Promise<User | Error>;
  resetPassword: (data: { email: string }) => Promise<Error | undefined>;
  logout: () => Promise<{ success: boolean; message?: string }>;
  userState: UserState;
}

// Return rejected promise if hooks are used outside the AuthContext tree.
const AuthContext = createContext<AuthContextTypes>({
  login: () => Promise.reject("Outside of context"),
  register: () => Promise.reject("Outside of context"),
  resetPassword: () => Promise.reject("Outside of context"),
  logout: () => Promise.reject("Outside of context"),
  userState: null,
});

const AuthProvider = ({ children }: Props) => {
  // Initial loading state
  const [userState, setUserState] = useState<UserState>({ type: "loading" });

  // Monitor auth state to check if user is logged in, logged out or if there's an error.
  const monitorAuthState = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState({ type: "success", user });
      } else {
        setUserState({ type: "error", error: new Error("No user logged in!") });
      }
    });

    return unsubscribe;
  };

  // Initialize Auth State Listener
  useEffect(() => {
    const unsubscribe = monitorAuthState();
    return () => unsubscribe();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
      // Login with filled in email and password
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return auth.currentUser!;
    } catch (error: unknown) {
      // Check if given error is a Firebase (in this case login) error, if so return error message. Otherwise return an unknown error.
      if (error instanceof FirebaseError) {
        return error;
      } else {
        return Error(`Unknown error: ${String(error)}`);
      }
    }
  };

  const register = async (data: { email: string; password: string }) => {
    try {
      // Register with filled in email and password
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      return auth.currentUser!;
    } catch (error: unknown) {
      // Check if given error is a Firebase (in this case register) error, if so return error message. Otherwise return an unknown error.
      if (error instanceof FirebaseError) {
        return error;
      } else {
        return Error(`Unknown error: ${String(error)}`);
      }
    }
  };

  const resetPassword = async (data: { email: string }) => {
    try {
      // Reset password with filled in password.
      await sendPasswordResetEmail(auth, data.email);
    } catch (error: unknown) {
      // Check if given error is a Firebase (in this case password reset) error, if so return error message. Otherwise return an unknown error.
      if (error instanceof FirebaseError) {
        return error;
      } else {
        return Error(`Unknown error: ${String(error)}`);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      return { success: true }; // Indicating successful logout
    } catch (error: unknown) {
      // Check if given error is a Firebase (in this case logout) error, if so return error message. Otherwise return an unknown error.
      if (error instanceof FirebaseError) {
        return { success: false, message: error.message };
      } else {
        return {
          success: false,
          message: `An unknown error occurred: ${String(error)}`,
        };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, register, resetPassword, logout, userState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
