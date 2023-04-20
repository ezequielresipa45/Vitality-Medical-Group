import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getAnalysis, getDoctors } from '../../redux/actions';
import axios from 'axios';
import style from './TicketsAnalysis.module.css';
import Swal from "sweetalert2";


const TicketsAnalysis = ({ patient }) => {
  console.log("tickets funcionando")

  const tickets = useSelector((state) => state.analysis);
  const dispatch = useDispatch();
 

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [deletedAnalysis, setDeletedAnalysis] = useState(false)
 
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

  const handleDelete = (id, e) => {
    
 
   
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
          const response = await axios.delete(`/ticketAnalysis/${id}/delete` , {
            id: {
              idTicket: id,
            },
          });
          setDeletedAnalysis(true)
          console.log(response.id)
        
        } catch (error) {
          console.error("error");
        }
        Swal.fire("Eliminado!", "El turno ha sido eliminado.", "Exitosamente");
      }
    });
  };

  const ticketToShow = patient.ticketAnalyses
  .filter((ticket)=>!ticket.is_delete)
  .slice((page-1)* pageSize, page * pageSize)

  return (
    <div className={style.div}>
      <h2>TUS ANALISIS</h2>
      {ticketToShow && (
        <div>
              {ticketToShow.map((ticket) => {
     
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

export default TicketsAnalysis;