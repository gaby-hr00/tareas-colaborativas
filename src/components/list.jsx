import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TaskForm from "./form";
import Buscador from "./search.jsx";
import FiltrosTareas from "./Filters.jsx";
import TodoItem from "./TodoItem";
import Pagination from "./pagination.jsx";

export default function List() {

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  // Estados
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const tareasPorPagina = 4;

  // Cargar tareas desde json-server
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/tareas")
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error cargando tareas:", err));
  }, [usuario, navigate]);

  // Simular delay para búsqueda
  useEffect(() => {
    if (busqueda === "") return;
    setLoadingBusqueda(true);
    const timer = setTimeout(() => setLoadingBusqueda(false), 500);
    return () => clearTimeout(timer);
  }, [busqueda]);

  // --- FUNCIONES CRUD ---
  const agregarTarea = async (tarea) => {
    try {
      const res = await fetch("http://localhost:5000/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tarea,
          fechaCreacion: new Date().toISOString(),
        }),
      });
      const tareaGuardada = await res.json();
      setTareas([...tareas, tareaGuardada]);
      toast.success("Tarea agregada con éxito");//alerta toastify
    } catch (err) {
      console.error("Error agregando tarea:", err);
    }
  };

  const editarTarea = async (id, nuevosDatos) => {
    try {
      const res = await fetch(`http://localhost:5000/tareas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevosDatos,
          ultimoEditor: usuario?.nombre || usuario?.email,
          fechaEdicion: new Date().toISOString(),
        }),
      });
      const tareaActualizada = await res.json();
      setTareas(tareas.map((t) => (t.id === id ? tareaActualizada : t)));
      toast.info("✏️ Tarea editada con éxito");//alerta toastify
    } catch (err) {
      console.error("Error editando tarea:", err);
    }
  };

  const toggleCompleted = async (id) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    const tareaActualizada = {
      ...tarea,
      completed: !tarea.completed,
      estado: tarea.completed ? tarea.estadoAnterior || "pendiente" : "completado",
      estadoAnterior: tarea.completed ? "" : tarea.estado,
    };

    try {
      const res = await fetch(`http://localhost:5000/tareas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      });
      const tareaGuardada = await res.json();
      setTareas(tareas.map((t) => (t.id === id ? tareaGuardada : t)));
    } catch (err) {
      console.error("Error actualizando completado:", err);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`http://localhost:5000/tareas/${id}`, { method: "DELETE" });
      setTareas(tareas.filter((t) => t.id !== id));
      toast.info("❌ Tarea eliminada con éxito");//alerta toastify
    } catch (err) {
      console.error("Error eliminando tarea:", err);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/registro");
  };

  // --- FILTRADO Y PAGINACIÓN ---
  const tareasFiltradas = tareas.filter((t) => {
    const estadoOk = filtroEstado === "todas" || t.estado === filtroEstado;
    const prioridadOk = filtroPrioridad === "todas" || t.prioridad === filtroPrioridad;
    const busquedaOk =
      t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return estadoOk && prioridadOk && busquedaOk;
  });

  const indexOfLast = currentPage * tareasPorPagina;
  const indexOfFirst = indexOfLast - tareasPorPagina;
  const tareasPagina = tareasFiltradas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tareasFiltradas.length / tareasPorPagina);

  return (
    <div className="max-w-6xl mx-auto mt-2 p-6 rounded shadow bg-pink-200">
      {/* HEADER: Buscador + Filtros + Cerrar Sesión */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center">LISTA DE TAREAS</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="w-full md:flex-1 md:max-w-[600px]">
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} loading={loadingBusqueda} />
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <FiltrosTareas
              filtroEstado={filtroEstado}
              setFiltroEstado={setFiltroEstado}
              filtroPrioridad={filtroPrioridad}
              setFiltroPrioridad={setFiltroPrioridad}
            />
          </div>
          <button
            onClick={cerrarSesion}
            className="bg-violet-500 text-white px-4 py-2 rounded-full hover:bg-purple-900 transition whitespace-nowrap mt-[-15px]"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* MAIN: Formulario + Lista de tareas */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <TaskForm agregarTarea={agregarTarea} usuario={usuario} />

        <div className="max-w-2xl -ml-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tareasPagina.length > 0 ? (
              tareasPagina.map((tarea) => (
                <TodoItem
                  key={tarea.id}
                  tarea={tarea}
                  toggleCompleted={toggleCompleted}
                  eliminarTarea={eliminarTarea}
                  editarTarea={editarTarea}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">No hay tareas</p>
            )}
          </div>
        </div>
      </main>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <footer className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </footer>
      )}
    </div>
  );
}
