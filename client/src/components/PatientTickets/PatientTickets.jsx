import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getDoctors, getTickets} from '../../redux/actions';
import axios from 'axios';
import style from './PatientTickets.module.css';
import Swal from "sweetalert2";



const PatientTickets = ({ patient }) => {
  
  const doctors = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [deletedTicket, setDeletedTicket] = useState(false)

  const page_size = 1

  useEffect(() => {
   
    dispatch(getTickets())

  }, [dispatch]);

  useEffect(() => {
    if (deletedTicket) {
      
      dispatch(getTickets())
      setDeletedTicket(false);
    }
  }, [deletedTicket, dispatch])

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleDelete = (data, e) => {
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
        
          const response = await axios.delete("/ticketMedical/destroyTicket", {
            data: {
              idTicket: data,
            },
          });
            setDeletedTicket(true);
            // window.location.reload();
        
          console.log(response.data);
        

          
          // setTicket((prevTickets) => prevTickets.filter((ticket) => ticket.id !== idTicket));
       
        } catch (error) {
          console.error(error.message);
        }

        Swal.fire("Eliminado!", "El turno ha sido eliminado.", "Exitosamente");
      }
    });
  };

  const ticketToShow = patient.ticketMedicals
  .filter((ticket)=>!ticket.is_delete)
  .slice((page-1)* page_size, page * page_size)

  return (
    <div className={style.div}>
      <h2>TUS TURNOS MEDICOS</h2>
      {ticketToShow &&  (
        <div>
           {ticketToShow.map((ticket) => (
            <div className={style["ticket-info"]} key={ticket.id}>
            
            <h3>Condición: {ticket.title}</h3>
            <h3>
              Doctor/a:{' '}
              {doctors.find((d) => d.id === ticket.doctorId)?.full_name}
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
        ))}
          {ticketToShow.length === 0 && <p>No tienes turnos próximos</p>}
          <button className={style.button} disabled={page === 1} onClick={handlePrevPage}>
            Anterior
          </button>
          
          <button className={style.button}
           disabled= {
             (page-1) * page_size + ticketToShow.length >= 
            patient.ticketMedicals.filter((ticket) => !ticket.is_deleted).length
           }
           onClick={handleNextPage}
          >
            Siguiente
          </button>
      
    </div>
  )}
</div>
)}
export default PatientTickets;


