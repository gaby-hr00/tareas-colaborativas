import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Registro() {
  //guardamos los datos del formulario en un solo estado  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // actualizar estado del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // validar campos
      if (!formData.nombre || !formData.email || !formData.password) {
        setMensaje("Por favor completa todos los campos");
        return;
      }

      // Encriptamos la contraseña con bcryptjs
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      // Crear usuario con contraseña encriptada
      const usuarioParaGuardar = {
        nombre: formData.nombre,
        email: formData.email,
        password: hashedPassword,
      };

      // Enviar datos al servidor
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioParaGuardar),
      });

      // Respuestas
      if (response.ok) {
        setMensaje("✅ Registro exitoso, redirigiendo...");
        setFormData({ nombre: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 100);
      } else {
        setMensaje("❌ Error al registrar usuario");
      }
      // Manejo de errores
    } catch (error) {
      console.error("Error:", error);
      setMensaje("⚠️ No se pudo conectar con el servidor");
    }
  };

  // Render
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-pink-200 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        {/* Campos del formulario */}
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 mb-3 border rounded bg-white" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="w-full p-2 mb-3 border rounded bg-white" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="w-full p-2 mb-3 border rounded bg-white" required />

            {/* Botón de envío */}
        <button type="submit" className="w-full bg-violet-500 text-white p-2 rounded hover:bg-purple-800 transition">Registrarse</button>

        {/* Mensaje de respuesta */}
        {mensaje && <p className="mt-3 text-green-600 text-center font-semibold">{mensaje}</p>}

        {/* Enlace a login */}
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
