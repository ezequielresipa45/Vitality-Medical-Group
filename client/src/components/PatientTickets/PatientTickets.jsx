import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getDoctors } from '../../redux/actions';
import style from './PatientTickets.module.css';
import { useState } from 'react';

const PatientTickets = ({ patient }) => {
  const doctors = useSelector((state) => state.doctors);
  const user = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  const[page, setPage] = useState(1)
  const [pageSize, setPageSize]= useState(1)


  useEffect(() => {
  dispatch(getPatients());
 dispatch(getDoctors());
}, []);

const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;


  return (
    <div className={style.div}>
      <h2>Tus turnos</h2>
      {patient.ticketMedicals.length > 0 && (
        <ul className={style.list}>
          {patient.ticketMedicals.slice(startIndex, endIndex).map((ticket) => (
            // <li key={ticket.id}>
              <div className={style["ticket-info"]} key={ticket.id}>
                <h3>Condición: {ticket.title}</h3>
                <h3>Doctor/a: {doctors.find((d) => d.id === ticket.doctorId)?.full_name}</h3>
                <h3>Fecha: {ticket.date}</h3>
                <h3>Hora: {ticket.hour}</h3>
              </div>
              
            
          ))}
        </ul>
      )}
   
    </div>
  );
};

export default PatientTickets;

