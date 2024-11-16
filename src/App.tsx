import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register } from "./pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    // Subscribe to the auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // Setting this state variable to confirm that authentication has been checked.
      setAuthChecked(true);
    });

    // Unsubscribe when the component unmounts.
    return () => {
      console.log('Cleaning up listener');
      unsubscribe();
    };
  }, []);
  
  if (!authChecked) {
    // Show a loading state while checking whether there's an authenticated user or not, to prevent from
    // briefly getting redirected to login page while authentication is being checked.
    return <div>Loading...</div>;
  }

  return (
    // Implemented react router package to take care of handling different pages/navigation.
    // "isAuthenticated" state variable is being used to only load pages according to authentication status.
    // e.g Home page should redirect login page if there's no authenticated user.
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      </Routes>
      {/* Add Toast container for toast notifications throughout the app. */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;