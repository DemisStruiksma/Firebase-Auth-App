import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Register } from "./pages";

function App() {
  return (
    // Implemented react router package to take care of handling different pages/navigation.
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Add Toast container for toast notifications throughout the app. */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;