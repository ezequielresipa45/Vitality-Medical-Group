import React from "react";
import  { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, getPatients } from "../../redux/actions";
import style from './FrequentDoctors.module.css';


const FrequentDoctors = ({patient}) => {
  
  const doctors = useSelector((state)=>state.doctors)
  // const patients =useSelector((state)=>state.patients)

  //traer paciente x id con useLocation

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(getDoctors());
   dispatch(getPatients())
  }, [dispatch]);


  const doctorIds = patient.ticketMedicals.map((ticket) => ticket.doctorId);  // busco en los ticketMedical los id de los doctores
  const frequentDoctors = doctors.filter((doctor) => doctorIds.includes(doctor.id));  // filtro los doctores que tengan mismo id que doctorIds 


  return (
    <>
       {frequentDoctors.length > 0 ? (
    <div>
      <h2 className={style.text}>MÉDICOS FRECUENTES</h2>
      <div>
        {frequentDoctors.map((doctor) => (
          <div className={style.text} key={doctor.id}>{doctor.full_name}</div>
        ))}
      </div>
    </div>
      ):(
        <div className={style.text} >"Aun no hay tenés médicos frecuentes"</div>
      )}
    </>
  );

};


export default FrequentDoctors;


