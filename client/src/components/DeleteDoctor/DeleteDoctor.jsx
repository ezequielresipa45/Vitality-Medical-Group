// BORRADO DE MEDICO POR ID

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsByID, deleteDoctor } from '../../redux/actions';
import style from './DeleteDoctor.module.css';

const DeleteDoctor = () => {
  const [doctorID, setDoctorID] = useState('');
  const dispatch = useDispatch();
  const [doctorInfo, setDoctorInfo] = useState({});
  // Obtener el médico desde el estado global
  const doctor = useSelector(state => state.doctor);
  
  useEffect(() => {
    setDoctorInfo(doctor[0])
  }, [doctor]);
  
  console.log(doctor);
  
  const handleSearch = e => {
    e.preventDefault();
    dispatch(getDoctorsByID(doctorID));
  };
  
  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteDoctor(doctorID));
    setDoctorID('');
    
  }
  
  return (
    <div className={style.firstDiv}>
      <h1>Buscar médico</h1>
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

      {doctor && (
        <div>
          <h2>{doctor.full_name}</h2>
          <p>Telefóno: {doctor.phone}</p>
          <p>Dirección: {doctor.address}</p>
          <p>Género: {doctor.gender}</p>
          <p>Edad: {doctor.age}</p>
          <p>Matrícula: {doctor.code}</p>
          <button className={style.button} onClick={handleDelete}>Eliminar</button>
          {/* Puedes mostrar otros detalles del médico */}
        </div>
      )}
    </div>
  );
};

export default DeleteDoctor;






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

// console.log(doctor);
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

//       {doctor && (
//         <div>
//           <h2>{doctor.full_name}</h2>
//           <p>Especialidad: {doctor.phone}</p>
//           <p>Horario: {doctor.address}</p>
//           {/* Puedes mostrar otros detalles del médico */}
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default AdminDelete;