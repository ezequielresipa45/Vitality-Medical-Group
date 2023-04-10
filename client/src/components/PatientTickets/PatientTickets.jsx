import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients } from '../../redux/actions';
import style from './PatientTickets.module.css';

const PatientTickets = () => {
  const user = useSelector((state) => state.user);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
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
                  <div>Observaciones: {t.observations}</div>
                  <div>Fecha: {t.date}</div>
                  <div>Hora: {t.hour_start}</div>
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
