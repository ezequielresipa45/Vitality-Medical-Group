
import React from "react";
import {useState} from "react"
import { Typography } from "@mui/material";
import  { useEffect } from 'react';
import { getDoctors, getPatients } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
      <ul>
        {frequentDoctors.map((doctor) => (
          <li key={doctor.id}>{doctor.full_name}</li>
        ))}
      </ul>
    </div>
      ):(
        <Typography>"No hay suficiente informacion para mostrar medicos frecuentes"</Typography>
      )}
    </>
  );

};


export default FrequentDoctors;


