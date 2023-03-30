import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsByID, deleteDoctor } from '../../redux/actions';

const AdminDelete = () => {
  const [doctorID, setDoctorID] = useState('');
  const dispatch = useDispatch();
  const [doctorInfo, setDoctorInfo] = useState({});
  // Obtener el médico desde el estado global
  const doctor = useSelector(state => state.doctor);
  useEffect(() => {
    setDoctorInfo(doctor[0])
  }, [doctor]);

  const handleSearch = e => {
    e.preventDefault();
    dispatch(getDoctorsByID(doctorID));
  };

  const handleDelete = () => {
    dispatch(deleteDoctor(doctorInfo.id));
  };

  return (
    <div>
      <h1>Buscar médico por ID</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="doctorID">ID del médico:</label>
        <input
          type="text"
          id="doctorID"
          value={doctorID}
          onChange={e => setDoctorID(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {doctorInfo && (
        <div>
          <h2>{doctorInfo.full_name}</h2>
          <p>Especialidad: {doctorInfo.phone}</p>
          <p>Horario: {doctorInfo.address}</p>
          {/* Puedes mostrar otros detalles del médico */}
          <button onClick={handleDelete}>Borrar médico</button>
        </div>
      )}

    </div>
  );
};

export default AdminDelete;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDoctorsByID } from '../../redux/actions';

// const AdminDelete = () => {
//   const [doctorID, setDoctorID] = useState('');
//   const dispatch = useDispatch();
//   const [doctorInfo, setDoctorInfo] = useState({});
//   // Obtener el médico desde el estado global
//   const doctor = useSelector(state => state.doctor);
//   useEffect(()=>{
//   setDoctorInfo(doctor[0])
// },[doctor]);

//   const handleSearch = e => {
//     e.preventDefault();
//     dispatch(getDoctorsByID(doctorID));
//   };

  

//   return (
//     <div>
//       <h1>Buscar médico por ID</h1>
//       <form onSubmit={handleSearch}>
//         <label htmlFor="doctorID">ID del médico:</label>
//         <input
//           type="text"
//           id="doctorID"
//           value={doctorID}
//           onChange={e => setDoctorID(e.target.value)}
//         />
//         <button type="submit">Buscar</button>
//       </form>

//       {doctorInfo && (
//         <div>
//           <h2>{doctorInfo.full_name}</h2>
//           <p>Especialidad: {doctorInfo.phone}</p>
//           <p>Horario: {doctorInfo.address}</p>
//           {/* Puedes mostrar otros detalles del médico */}
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default AdminDelete;





