import { Search } from "lucide-react";

export default function Buscador({ busqueda, setBusqueda, loading }) {
  return (
    <div className="mb-5 flex relative">
      <Search className="absolute mt-2 ml-2 text-gray-400" />
      <input
        className="w-full p-2 pl-8 border rounded-full bg-white"
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por título o descripción..."
      />
      {loading && busqueda.trim() !== "" && (
        <div className="absolute right-2 top-3 w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      )}
    </div>
  );
}
