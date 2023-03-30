import React from 'react';

function DeleteItem({ itemType, itemId, onDelete }) {
  const handleDelete = () => {
    fetch(`https://miapi.com/${itemType}/${itemId}`, { method: 'DELETE' })
      .then(() => onDelete());
  };

  return (
    <button onClick={handleDelete}>Eliminar</button>
  );
}

export default DeleteItem;
