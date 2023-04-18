import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getAnalysis, getDoctors } from '../../redux/actions';
import axios from 'axios';
import style from './TicketsAnalisys.module.css';
import Swal from "sweetalert2";


const TicketsAnalisys = ({ patient }) => {
//   const ticketsAnalisys = useSelector((state) => state.ticketsAnalisys);
//   const user = useSelector((state) => state.user);
//   const patients = useSelector((state) => state.patients);
  const tickets = useSelector((state) => state.analysis);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [deletedAnalysis, setDeletedAnalysis] = useState(false)
  const [patients, setPatients] = useState({});


  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getAnalysis());
  }, [dispatch]);

  useEffect(() => {
    if (deletedAnalysis) {
      dispatch(getPatients());
      dispatch(getDoctors())
      dispatch(getAnalysis())
      setDeletedAnalysis(false);
    }
  }, [deletedAnalysis, dispatch])

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
   

    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/analysis/${id}`)
        
          // // const response = await axios.delete(`/ticketMedical/${idTicket}/delete`);
          // setDeletedTicket(true);
          // const response = await axios.delete(`/analysis/${id}`)
          // setDeletedAnalysis(true);
        
          // console.log(response.data);
          const updatedPatients = { ...patient };
        const analysisIndex = updatedPatients.ticketAnalyses.findIndex((a) => a.id === id);
        updatedPatients.ticketAnalyses[analysisIndex].is_delete = true;
        setPatients(updatedPatients);
        window.location.reload();
console.log(updatedPatients)
          
          // setTicket((prevTickets) => prevTickets.filter((ticket) => ticket.id !== idTicket));
       
        } catch (error) {
          console.error(error.message);
        }

        Swal.fire("Eliminado!", "El turno ha sido eliminado.", "Exitosamente");
      }
    });
  };



  // const ticketToShow = patient.ticketAnalyses[page - 1];
  // const ticketToShow = patient.ticketAnalyses.slice((page - 1) * pageSize, page * pageSize);


  const ticketToShow = patient.ticketAnalyses
  .filter((ticket)=>!ticket.is_delete)
  .slice((page-1)* pageSize, page * pageSize)

  return (
    <div className={style.div}>
      <h2>TUS ANALISIS</h2>
      {patient.ticketAnalyses.length > 0 && (
        <div>
              {ticketToShow.map((ticket) => {
      if (!ticketToShow.is_delete) {
        return (
          <div className={style["ticket-info"]} key={ticket.id}>
            
            <h3>
              Nombre:{' '}
              {tickets.find((d) => d.id === ticket.analysisId)?.name}
              
            </h3>
            <h3>Fecha: {ticket.date}</h3>
            <h3>Hora: {ticket.hour}</h3>
            <form onSubmit={(e) => handleDelete(ticket.id, e)}>
                            <button
                              type="submit"
                             
                                className={style.button_delete}
                              
                            >
                              <i className={style.button_delete}
                              >Cancelar
                              </i>
                            </button>
                          </form>
          
          </div>
        )
                            }
                          })}
                          {ticketToShow.length === 0 && <p className={style.text}>No tiene análisis próximos</p>}
          <button className={style.button} disabled={page === 1} onClick={handlePrevPage}>
            Anterior
          </button>
          
          <button className={style.button}
            // disabled={page === patient.ticketAnalyses.length}
            disabled={page * pageSize >= patient.ticketAnalyses.length}
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