import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getDoctors } from '../../redux/actions';
import style from './PatientTickets.module.css';

const PatientTickets = () => {
  const user = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
  }, []);

  const patientsByLogin = patients.filter((p) => p.userId === user.id);
 
  return (
    <div className={style.div}>
      <p>Turnos Tomados:</p>
      {patientsByLogin.length > 0 && (
        <ul className={style.list}>
          {patientsByLogin[0].ticketMedicals.map((t) => {
            return (
              <li key={t.id}>
                <div className={style['ticket-info']}>
                  <div>Condición: {t.title}</div>
                  <div>Doctor/a: {doctors.find((d) => d.id === t.doctorId)?.full_name}</div>

                  <div>Fecha: {t.date}</div>
                  <div>Hora: {t.hour}</div>
                </div>
                <br />
                <br />
              </li>
              
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PatientTickets;
