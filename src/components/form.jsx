import { useState } from "react";

export default function TaskForm({ agregarTarea, usuario }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [estado, setEstado] = useState("pendiente");

  const handleSubmit = () => {
    if (!titulo.trim()) return;

    agregarTarea({
      id: Date.now(),
      titulo,
      descripcion,
      prioridad,
      estado,
      estadoAnterior: "",
      completed: false,
      creador: usuario?.nombre || usuario?.email,
      ultimoEditor: null,
    });

    // Resetear campos
    setTitulo("");
    setDescripcion("");
    setPrioridad("media");
    setEstado("pendiente");
  };

  return (
    <div className="space-y-3 mb-5 max-w-md">
      <input
        className="w-full p-2.5 text-base border rounded bg-white"
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la tarea"
      />

      <textarea
        className="w-full p-2.5 text-base border rounded bg-white"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción de la tarea"
        rows={3}
      />

      <select
        className="w-full p-2.5 text-base border rounded bg-white"
        value={prioridad}
        onChange={(e) => setPrioridad(e.target.value)}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>

      <select
        className="w-full p-2.5 text-base border rounded bg-white"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completado">Completado</option>
      </select>

      <button
        className="w-full bg-violet-500 text-white py-2.5 text-base rounded-full hover:bg-purple-900 transition"
        onClick={handleSubmit}
      >
        Añadir Tarea
      </button>
    </div>
  );
}
