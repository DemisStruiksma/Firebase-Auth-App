import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
    </Router>
  );
}

export default App;
