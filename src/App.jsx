import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./components/registro";
import Login from "./components/login";
import Dashboard from "./components/list";
import List from "./components/list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
