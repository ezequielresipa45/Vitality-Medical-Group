import React from 'react';
import { useState , useEffect , useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedTickets, postConfirmedTickets, getSelectedTickets } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider , DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { FormControl , InputLabel , Select , MenuItem , FormHelperText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import styles from './TicketPicker.module.css';

const TicketPicker = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = {name: 'Emanuel Marquez', id: '1' }; // Aca hay que traer la info del usaurio logueado

    const confirmedTickets = useSelector((state) => state.confirmedTickets);

    const selectedTickets = useSelector((state) => state.selectedTickets);

    const date = new Date();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const availableDays = ['Lunes', 'Miercoles', 'Viernes'];
    const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    let typeOfTicket;
    if (selectedTickets.from === '/analisis') typeOfTicket = 'Análisis / Estudio';
    else typeOfTicket = 'Consulta Médica';
    
    //const dateFormat = format(date, 'dd/MM/yyyy');

    const [isTrue, setIsTrue] = useState(false);

    const [availableSchedules, setAvailableSchedules] = useState(schedules);
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState(null);

    const availabilityValidator = (value) => {
        let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        let userDate = new Date(value);
        //console.log(userDate);
        //console.log(days[userDate.getDay()]);
        if(availableDays.includes(days[userDate.getDay()])) {
            setIsAvailable(true);
            return setError(null);
        }
        else {
            setIsAvailable(false);
            return setError('El dia seleccionado no esta disponible');
        };
    };

    const handleDateChange = (value) => {
        availabilityValidator(value);
        setSelectedDate(value);
    };

    console.log(selectedDate);
    console.log(format(selectedDate, 'dd/MM/yyyy'));

    const handleSchedulesChange = (e) => {
        setSelectedSchedule(e.target.value);
        
    };

    const onClickConfirm = () => {
        dispatch(postConfirmedTickets({
            user: user,
            type: typeOfTicket,
            title: selectedTickets.title,
            date: format(selectedDate, 'dd/MM/yyyy'),
            schedule: selectedSchedule,
            code: selectedTickets.code
        }));
        console.log('Confirmaste el turno');
        setIsTrue(true);
        setSelectedSchedule('');
        setAvailableSchedules(availableSchedules.filter((item) => item !== selectedSchedule));
    };

    const handleCloseModal = () => {
        setIsTrue(false);
    };

    const onClickGoToPaid = () => {
        console.log('continuar');
    };

    const onClickBackToSelect = () => {
        console.log('volver');
        navigate('/analisis');
    }

    useLayoutEffect(() => {
        dispatch(getSelectedTickets());
        dispatch(getConfirmedTickets());
    }, []);

    useEffect(() => {
        localStorage.setItem('confirmedItems', JSON.stringify(confirmedTickets));
    }, [confirmedTickets]);
    
    console.log(JSON.parse(localStorage.getItem('confirmedItems')));

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <div className={styles.container}>
                
                <h2>Selector de fecha y horario para el turno</h2>
                <p>Tipo de turno: {typeOfTicket}</p>
                <p>{selectedTickets.title}</p>
                <DatePicker 
                    sx={{ m: 1, minWidth: 320 }}
                    label='Seleccione la fecha'
                    value={selectedDate}
                    slotProps={{
                        textField: {
                            error: error && true,
                            helperText: error && error
                        }
                    }}
                    onChange={(value) => handleDateChange(value)}
                    disablePast
                />
                {isAvailable && 

                <FormControl sx={{ m: 1, minWidth: 320 }} error={error && true}>
                    <InputLabel id='select_schedules'>Horarios</InputLabel>
                    <Select
                        labelId='select_schedules'
                        id='select'
                        label='Horarios'
                        value={selectedSchedule}
                        onChange={(e) => handleSchedulesChange(e)}
                    >
                        {availableSchedules.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>Error</FormHelperText>}
                </FormControl>

                }

                {selectedSchedule && <Button variant='outlined' onClick={onClickConfirm} >Confirmar turno</Button>}

                {isTrue &&  
                <Dialog
                open={isTrue}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {''}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Quiere seguir agregando items o finalizar el proceso de confirmación del turno?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClickBackToSelect}>Seleccionar Items</Button>
                        <Button onClick={onClickGoToPaid} autoFocus>Finalizar</Button>
                    </DialogActions>
                </Dialog>
            }

            </div>
        </LocalizationProvider>
    )
};

export default TicketPicker;