import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./pages/registro";
import Login from "./pages/login";
import List from "./components/list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <List/>
    </>
  );
}

export default App;
