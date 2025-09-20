export default function FiltrosTareas({
  filtroEstado,
  setFiltroEstado,
  filtroPrioridad,
  setFiltroPrioridad,
}) {
  return (
    <div className="flex gap-2 mb-5">
      <select
        className="flex-1 p-2 border rounded bg-white"
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
      >
        <option value="todas">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completado">Completado</option>
      </select>

      <select
        className="flex-1 p-2 border rounded bg-white"
        value={filtroPrioridad}
        onChange={(e) => setFiltroPrioridad(e.target.value)}
      >
        <option value="todas">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
  );
}
