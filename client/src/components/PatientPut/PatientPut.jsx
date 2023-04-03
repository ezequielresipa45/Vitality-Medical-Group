import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientsById, putPatient } from '../../redux/actions';
import style from './PatientPut.module.css';

const PatientPut = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);

  useEffect(() => {
    setUserDate({
      id: patient.id,
      name: patient.full_name,
      phone: patient.phone,
      address: patient.address,
      
    });
  }, [patient]);

  console.log(patient);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getPatientsById(id));
  };

  const [userDate, setUserDate] = useState({
    id: '',
    phone: '',
    address: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putPatient(userDate));
  };

  return (
    <div className={style.firstDiv}>
      <h2>Actualiza tu información:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Paciente ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          />
        <button onClick={handleSearch}>Search</button>
        <br />
        <br />
        {patient.id && (
            <>
            <h2>{patient.full_name}</h2>
            <label htmlFor="phone">Número telefónico</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDate.phone}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDate.address}
              onChange={handleChange}
            />
            <br />
            <br />
           
            <button className={style.button} type="submit">Actualizar</button>
          </>
        )}
      </form>
    </div>
  );
};
export default PatientPut; 