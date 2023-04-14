import React from "react";
import {useState} from "react"
import { Typography } from "@mui/material";
import  { useEffect } from 'react';
import { getDoctors } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const FrequentDoctors = ({frequent}) => {
 
  const dispatch = useDispatch()
  const [frequentDoctors, setFrequentDoctors] = useState([])
  const doctors = useSelector((state)=>state.doctors)
 

  useEffect(() => {
   dispatch(getDoctors());
  }, []);


  const countDoctors = (tickets) => {
    const doctorCounts = {};
    tickets.forEach((ticket) => {
      // console.log("countDoc:"countDoctors)
      const doctorId = ticket.doctorId;
      console.log("docID:", doctorId)
      if (!doctorCounts[doctorId]) {
        doctorCounts[doctorId] = 1;
      } else {
        doctorCounts[doctorId]++;
      }
    });
    return doctorCounts;

    
  };
  useEffect(()=> {
    if(frequent && frequent[0]){
      console.log("frequent:", frequent)
      const frequentDoctorId = frequent[0]
      const doctor = doctors.find((doctor) => doctor.id === frequentDoctorId);
      setFrequentDoctors([doctor]);

    }
  },[]) 
  //   if (frequent && frequent.ticketMedicals) {
  //     console.log("Entro")
  //     const doctorsIds = frequent.ticketMedicals.map((ticket) => ticket.doctorId);
  //     const doctorCounts = countDoctors(frequent.ticketMedicals);
  //     const frequentDoctors = Object.keys(doctorCounts).sort((a, b) => doctorCounts[b] - doctorCounts[a]).slice(0, 3);
  //     console.log("frecDoc:", frequentDoctors)

  //     const doctorsList = frequentDoctors.map((doctorId) => {
  //     // console.log("doctorID: ", doctorId)
  //     // console.log("doctors: ", doctors)
  //     return doctors.find((doctor) => doctor.id === doctorId)
  //   });
  //     console.log("doctorsList:", doctorsList)
  //     setFrequentDoctors(doctorsList);
  //   }
  // }, [frequent, doctors]);
    
  

 
  return (
    <>
      <Typography>Médicos frecuentes:</Typography>

      {frequentDoctors.length > 0 ? (
      <ul>
        {frequentDoctors.map((doctor) => (
          <li key={doctor.id}>

          <h3> {doctors.find((d) => d.id === ticket.frequent)?.full_name}</h3>
          </li>
        ))}
      </ul>
      ):(
        <Typography>"No hay suficiente informacion para mostrar medicos frecuentes"</Typography>
      )}
    </>
  );

};


export default FrequentDoctors;


