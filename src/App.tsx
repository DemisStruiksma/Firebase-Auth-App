import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthProvider";
import { Spinner } from "./components/atoms";
import { routes } from "./constants";
import { Home, Login, NotFound, Register, ResetPassword } from "./pages";

function App() {
  const auth = useAuth();

  if (!auth.userState || auth.userState.type === "loading") {
    // Display a loading state (spinner) while checking authentication status to avoid flickering between screens
    // during the authentication check process.
    return <Spinner />;
  }

  return (
    // Implemented react router package to take care of handling different pages/navigation.
    // Also took care of route protection, home page should only load if there's an authenticated user.
    // Register page, login page and reset password page should only load if user is not authenticated/logged out.
    <Router>
      <Routes>
        <Route
          path={routes.home}
          element={
            auth.userState.type === "success" ? (
              <Home />
            ) : (
              <Navigate to={routes.login} />
            )
          }
        />
        <Route
          path={routes.register}
          element={
            auth.userState.type === "success" ? (
              <Navigate to={routes.home} />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path={routes.login}
          element={
            auth.userState.type === "success" ? (
              <Navigate to={routes.home} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path={routes.resetPassword}
          element={
            auth.userState.type === "success" ? (
              <Navigate to={routes.home} />
            ) : (
              <ResetPassword />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Add Toast container for toast notifications throughout the app. */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
