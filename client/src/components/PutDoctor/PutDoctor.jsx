import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsByID, putDoctor } from '../../redux/actions';
import style from './PutDoctor.module.css';

const PutDoctor = () => {
  const [doctorID, setDoctorID] = useState('');
  const dispatch = useDispatch();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [updatedDoctorInfo, setUpdatedDoctorInfo] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener el médico desde el estado global
  const doctor = useSelector(state => state.doctor);

  useEffect(() => {
    setDoctorInfo(doctor[0]);
  }, [doctor]);
console.log(doctor)
  const handleSearch = e => {
    e.preventDefault();
    dispatch(getDoctorsByID(doctorID));
  };

  const handleUpdate = e => {
    e.preventDefault();
    dispatch(putDoctor(doctorID, updatedDoctorInfo));
    setDoctorInfo(updatedDoctorInfo);
    setSuccessMessage('Información actualizada correctamente.');
  };

  return (
    <div className={style.firstDiv}>
      <h1>Buscar Doctor</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="doctorID">ID del medico:</label>
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
          <h2>Nombre: {doctor.full_name}</h2>
          <p>Teléfono: {doctor.phone}</p>
          <form onSubmit={handleUpdate}>
            {/* <label htmlFor="fullName">Nombre:</label>
            <input
              type="text"
              id="fullName"
              value={updatedDoctorInfo.full_name || doctor.full_name}
              onChange={e =>
                setUpdatedDoctorInfo({
                  ...updatedDoctorInfo,
                  full_name: e.target.value,
                })
              }
            /> */}
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="text"
              id="phone"
              value={updatedDoctorInfo.phone || doctor.phone}
              onChange={e =>
                setUpdatedDoctorInfo({
                  ...updatedDoctorInfo,
                  phone: e.target.value,
                })
              }
            />
            <button type="submit">Actualizar información</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default PutDoctor;




