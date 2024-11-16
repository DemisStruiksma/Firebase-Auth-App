import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../services/firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try { 
            // Login with filled in email and password, display success notifcation after.
            await signInWithEmailAndPassword(auth, email, password).then(() => toast.success("Logged in successfully."));
            navigate("/");
        } catch (error: unknown) {
            // Check if given error is a Firebase (in this case register) error, if so display error message. Otherwise throw an unknown error.
            if (error instanceof FirebaseError) {                
                // Use toast notification for error handling.
                toast.error(error.message);
            } else {
                toast.error(`An unknown error occurred', ${error}`);

            }
        }
    }
    return (
        <div>
              <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>

                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
  }
  
export default Login;