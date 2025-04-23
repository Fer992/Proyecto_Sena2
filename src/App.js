import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Announcement from "./Components/Announcement"; 
import Login from "./Components/Login";
import Compras from "./Components/Compras";
import Contactanos from "./Components/Contactanos";

function App() {
  return (
    <Router>
      <div>
        <Announcement />
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Compras" element={<Compras />} />
          <Route path="/Contactanos" element={<Contactanos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;