import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams , useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'; 
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, postSelectedTickets, deleteSelectedTickets } from '../../redux/actions';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styles from "./Specialitys.module.css";

export default function Specialitys() {

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { speciality } = useParams();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const doctors = useSelector((state) => state.doctors);

  const selectedTickets = useSelector((state) => state.selectedTickets);

  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    dispatch(getDoctors());
  }, []);

  const handleClickTicket = (value) => {
    dispatch(postSelectedTickets({
        origin: location.pathname,
        name: value.full_name,
        speciality: value.specialities[0].speciality,
        code: value.code,
        price: 2000,
        days: value.days.map((item) => item.day),
        schedules: value.is_morning && ['8:00','9:00','10:00','11:00'] || value.is_evening && ['13:00','14:00','15:00','16:00'],
    }));
    
    localStorage.setItem('selectedItems', JSON.stringify({
      origin: location.pathname,
      name: value.full_name,
      speciality: value.specialities[0].speciality,
      code: value.code,
      price: 2000,
      days: value.days.map((item) => item.day),
      schedules: value.is_morning && ['8:00','9:00','10:00','11:00'] || value.is_evening && ['13:00','14:00','15:00','16:00'],
    }));

    isAuthenticated ? navigate('/turnos') : setIsOpen(true); // Aca hay que validar si el usuario esta logueado
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(deleteSelectedTickets());
    localStorage.removeItem('selectedItems');
  };

  const onClickContinue = () => {
    isAuthenticated ? navigate('/turnos') : loginWithRedirect({ authorizationParams: { redirect_uri: `${window.location.origin}/turnos` } });
    //console.log(JSON.parse(localStorage.getItem('selectedItems')));
  };

  return (
    <div className={styles.container__speciality}>
      
      {/* <h1>{` ${speciality}`}</h1> */}
      
      <header>      
      
      <h2>Profesionales</h2>
      
      <hr />
      
      <section>

        {doctors && doctors.filter(doctor => doctor.specialities[0].speciality === speciality.toLocaleLowerCase()).map((doctor) => (
        
          <div key={doctor.id} className={styles.cardMedic__container}>
            <img width={120} src={doctor.image} alt={doctor.full_name} />   
            <h3>{doctor.full_name}</h3> 
            <h4>{doctor.specialities[0].speciality}</h4> 
            <p>Días:  {doctor.days.map((item) => item.day).join(' - ')}</p>
            <p>Horarios:  {doctor.is_morning && '8 hs a 12 hs' || doctor.is_evening && '13 hs a 17 hs'}</p>
            {/* <h3>{doctor.gender}</h3>  */}
            {/* <h3>{doctor.age}</h3>  */}
            <button onClick={() => handleClickTicket(doctor)}>Pedí un turno</button>
          </div>
      ))}
      
        {doctors.length === 0 && (
          <div>
              Cargando...
          </div>
        )}

      </section> 
      
      </header>

      {isOpen &&  
        <Dialog
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Debe iniciar sesión'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Para continuar el proceso de confirmación del turno debe iniciar sesión con su cuenta de usuario. Si no tiene, puede crearla para disfrutar de todos los beneficios que ofrecemos.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickContinue} autoFocus>Continuar</Button>
            </DialogActions>
        </Dialog>
      }
      
    </div>
  );
}
