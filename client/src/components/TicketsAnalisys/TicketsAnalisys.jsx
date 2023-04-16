import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getTicketsAnalisys, getAnalysis } from '../../redux/actions';
import style from './TicketsAnalisys.module.css';
import { useState } from 'react';

const TicketsAnalisys = ({ patient }) => {
//   const ticketsAnalisys = useSelector((state) => state.ticketsAnalisys);
//   const user = useSelector((state) => state.user);
//   const patients = useSelector((state) => state.patients);
  const tickets = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    dispatch(getPatients());
    // dispatch(getTicketsAnalisys());
    dispatch(getAnalysis())
  }, []);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const ticketToShow = patient.ticketAnalyses[page - 1];

  return (
    <div className={style.div}>
      <h2>TUS TURNOS</h2>
      {patient.ticketAnalyses.length > 0 && (
        <div>
          <div className={style["ticket-info"]} key={ticketToShow.id}>
            
            <h3>
              Nombre:{' '}
              {tickets.find((d) => d.id === ticketToShow.analysisId)?.name}
            </h3>
            <h3>Fecha: {ticketToShow.date}</h3>
            <h3>Hora: {ticketToShow.hour}</h3>
          </div>
          <button className={style.button} disabled={page === 1} onClick={handlePrevPage}>
            Anterior
          </button>
          
          <button className={style.button}
            disabled={page === patient.ticketAnalyses.length}
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketsAnalisys;