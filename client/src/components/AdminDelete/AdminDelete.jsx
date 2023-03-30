import React, { useState, useEffect } from 'react';
import DeleteItem from './DeleteItem.jsx';
import style from './AdminDelete.module.css';


function AdminDelete({ itemType }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Realizar una solicitud a la API para obtener la lista de elementos
    fetch(`https://miapi.com/${itemType}`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log(error));
  }, [itemType]);

  const handleDelete = (itemId) => {
    // Filtrar la lista de elementos para excluir el elemento eliminado
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSearch = (event) => {
    // Actualizar el término de búsqueda
    setSearchTerm(event.target.value);
  };

  // Filtrar la lista de elementos basándonos en el término de búsqueda
  const filteredItems = items.filter(item => item.nombre.includes(searchTerm));

  return (
    <div className={style.firstDiv}>
      <h2>Buscar y eliminar {itemType}</h2>
      <input type="text" placeholder="Buscar por nombre" value={searchTerm} onChange={handleSearch} />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.nombre} {item.apellido}
            <DeleteItem itemType={itemType} itemId={item.id} onDelete={() => handleDelete(item.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EliminarDoctoresPorNombre() {
  return (
    <AdminDelete itemType="doctores" />
  );
}

function EliminarPacientesPorNombre() {
  return (
    <AdminDelete itemType="pacientes" />
  );
}

function EliminarEspecialidadesPorNombre() {
  return (
    <AdminDelete itemType="especialidades" />
  );
}

export default AdminDelete;