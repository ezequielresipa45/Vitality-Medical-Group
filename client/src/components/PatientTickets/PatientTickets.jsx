import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getDoctors } from '../../redux/actions';
import style from './PatientTickets.module.css';




const PatientTickets = ({ patient }) => {
  const doctors = useSelector((state) => state.doctors);
  const user = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getPatients());
 dispatch(getDoctors());
}, []);


  return (
    <div className={style.div}>
      <h2>Tus turnos</h2>
      {patient.ticketMedicals.length > 0 && (
        <ul className={style.list}>
          {patient.ticketMedicals.map((ticket) => (
            // <li key={ticket.id}>
              <div className={style["ticket-info"]}>
                <h3>Condición: {ticket.title}</h3>
                <h3>Doctor/a: {doctors.find((d) => d.id === ticket.doctorId)?.full_name}</h3>
                <h3>Fecha: {ticket.date}</h3>
                <h3>Hora: {ticket.hour}</h3>
              </div>
              // <br />
              // <br />
            // </li>
          ))}
        </ul>
      )}
      {/* <p>{ticket.date}</p>
      <p>{ticket.title}</p> */}
    </div>
  );
};

export default PatientTickets;

