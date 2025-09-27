import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //validacion de credenciales
  const [mensaje, setMensaje] = useState(""); //respuesta
  const navigate = useNavigate(); //navegación

    // manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // traer usuario por email
      const res = await fetch(`http://localhost:5000/usuarios?email=${encodeURIComponent(email)}`);
      const users = await res.json();
      
      // si no existe
      if (users.length === 0) {
        setMensaje("❌ Usuario no encontrado");
        return;
      }

      const user = users[0]; // json-server devuelve array

      // comparar contraseñas
      const match = await bcrypt.compare(password, user.password);

      //guardamos datos en localStorage y redirigimos
      if (match) {
        setMensaje("✅ Inicio de sesión exitoso");
        localStorage.setItem("usuarioLogueado", JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email }));
        setTimeout(() => navigate("/list"), 100);
      } else { // si no coinciden los datos
        setMensaje("❌ Credenciales incorrectas");
      }
    } catch (error) { // manejo de errores
      console.error("Error:", error);
      setMensaje("⚠️ No se pudo conectar con el servidor");
    }
  };

    // Render
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-pink-200 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded bg-white" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded bg-white" required />

        <button type="submit" className="w-full bg-violet-500 text-white p-2 rounded hover:bg-purple-800 transition">Iniciar Sesión</button>

        {/* Mensaje de respuesta */}
        {mensaje && <p className="mt-3 text-center font-semibold">{mensaje}</p>}
      </form>
    </div>
  );
}
