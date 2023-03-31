import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientsById, deletePatient } from '../redux/actions';
import style from './DeletePatient.module.css';

const DeletePatient = () => {
  const [patientID, setPatientID] = useState('');
  const dispatch = useDispatch();
  const [patientInfo, setPatientInfo] = useState({});
  // Obtener el médico desde el estado global
  const patient = useSelector(state => state.patient);
  
  useEffect(() => {
    setPatientInfo(patient[0])
  }, [patient]);
  
  console.log(patient);
  
  const handleSearch = e => {
    e.preventDefault();
    dispatch(getPatientsById(patientID));
  };
  
  const handleDelete = e => {
    e.preventDefault();
    dispatch(deletePatient(patientID));
    setPatientID('');
    
  }
  
  return (
    <div className={style.firstDiv}>
      <h1>Buscar Paciente</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="patientID">ID del paciente:</label>
        <input
          type="text"
          id="patientID"
          value={patientID}
          onChange={e => setPatientID(e.target.value)}
          />
        <button type="submit">Buscar</button>
      </form>

      {patient && (
        <div>
          <h2>{patient.full_name}</h2>
          <p>Teléfono: {patient.phone}</p>
          <p>Dirección: {patient.address}</p>
          <p>Edad: {patient.age}</p>
          <p>Id: {patient.id}</p>
          <button className={style.button} onClick={handleDelete}>Eliminar</button>
          {/* Puedes mostrar otros detalles del médico */}
        </div>
      )}
    </div>
  );
};

export default DeletePatient;