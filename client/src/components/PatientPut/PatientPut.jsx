import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { getPatientsById, putPatient } from '../../redux/actions';
import patientPic from "../../images/patientForm-img.jpeg"
import style from "../PatientPut/PatientPut.module.css"

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
    props.history.push('/paciente')
  };

  return (
    <div className={style.container__patient}>
      <img src={patientPic} alt="" />

      <div className={style.container__patient_form}>

      <h2>Actualiza tu información:</h2>
     
      <form onSubmit={handleSubmit}>
      <div>
      <input
          type="text"
          id="id"
          name="id"
          value={id}
          placeholder='Ingrese un Id'
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}><i class="fas fa-search"></i> Buscar</button>

        </div>
       
        {patient.id && (
            <>
            <h2 className={style.container__patient_form}>{patient.full_name}</h2>
            
            <label htmlFor="phone" className={style.container__patient_form}>Número telefónico</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDate.phone}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="address" >Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDate.address}
              onChange={handleChange}
            />
            <br />
            <br />
           
            <button className={style.btn__form} type="submit">Actualizar</button>
            
          </>
        )}
      </form>
    </div>
    </div>
  );
};

export default PatientPut; 