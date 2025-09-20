import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState(tarea.prioridad);
  const [estado, setEstado] = useState(tarea.estado);
  
  const guardarEdicion = () => {
    editarTarea(tarea.id, { titulo, descripcion, prioridad, estado });
    setEditando(false);
  };

return (
  <>
    {/* CARD NORMAL */}
    <motion.div
      className="border p-3 rounded shadow-sm bg-gray-50 flex flex-col justify-between max-w-sm w-full break-words"
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
        <div className="break-words">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-bold break-words ${tarea.completed ? "line-through text-gray-400" : ""}`}>
              {tarea.titulo}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={tarea.completed}
                onChange={() => toggleCompleted(tarea.id)}
              />


              <button onClick={() => setEditando(true)}>
                <PencilIcon className="w-5 h-5 text-blue-500" />
              </button>


              <button onClick={() => eliminarTarea(tarea.id)}>
                <TrashIcon className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>


          {tarea.descripcion && (
          <p className="text-gray-600 mt-1 break-words max-h-10 overflow-y-auto">
            {tarea.descripcion}
          </p>
        )}

          <div className="mt-1 text-xs text-gray-500 break-words">
            <p><strong>Creador:</strong> {tarea.creador}</p>
            {tarea.ultimoEditor && <p><strong>Editado por:</strong> {tarea.ultimoEditor}</p>}
          </div>
        </div>

        {/* Prioridad y estado fijos abajo */}
        <div className="flex justify-between mt-2 text-sm flex-wrap gap-2">
          <span
            className={`px-2 py-1 rounded-full text-white truncate max-w-[45%] ${
              tarea.prioridad === "alta"
                ? "bg-red-500"
                : tarea.prioridad === "media"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
          {tarea.prioridad}
          </span>
          <span
            className={`px-2 py-1 rounded-full truncate max-w-[45%] ${
              tarea.estado === "pendiente"
                ? "bg-gray-300 text-gray-700"
                : tarea.estado === "en progreso"
                ? "bg-blue-300 text-blue-700"
                : "bg-green-300 text-green-700"
            }`}
          >
            {tarea.estado}
          </span>
        </div>
      </motion.div>

      {/* MODAL DE EDICIÓN */}
      <AnimatePresence>
        {editando && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-pink-200 bg-opacity-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h2 className="text-lg font-bold mb-4">Editar Tarea</h2>
              <input
                className="w-full p-2 border rounded mb-2 break-words"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded mb-2 break-words"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <select
                className="w-full p-2 border rounded mb-2"
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
              <select
                className="w-full p-2 border rounded mb-4"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completado">Completado</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-full"
                  onClick={guardarEdicion}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-400 text-white px-3 py-1 rounded-full"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}