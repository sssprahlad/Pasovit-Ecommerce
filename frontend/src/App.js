import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/UserDetails/Login/Login";
import Register from "./components/UserDetails/Register/Register";
import ProtectedRouter from "./constants/ProtectedRouter";
import Home from "./components/Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <div className="app">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
