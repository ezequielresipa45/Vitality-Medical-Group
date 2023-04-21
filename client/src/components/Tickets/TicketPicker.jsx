import React from 'react';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedTickets, postConfirmedTickets, getSelectedTickets, getPatients, getPatientsById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider , DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { FormControl , InputLabel , Select , MenuItem , FormHelperText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse, parseISO } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import styles from './TicketPicker.module.css';

const TicketPicker = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const userInfo = useSelector((state) => state.userById);

    const patients = useSelector((state) => state.patients.filter((item) => item.userId === user.id));

    const patientInfo = useSelector((state) => state.patient);

    const confirmedTickets = useSelector((state) => state.confirmedTickets);

    const userTickets = useSelector((state) => state.confirmedTickets.filter((item) => item.user === user.id));

    const selectedTickets = useSelector((state) => state.selectedTickets);
    
    const [isTrue, setIsTrue] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({
        response: '',
        ticket: '',
        date: '',
        schedule: '',
        observation: ''
    });
    
    //Tipo de turno
    const ticket_type = selectedTickets?.origin === '/analisis' ? 'Análisis / Estudio' : 'Consulta Médica';
    
    //Info del paciente
    const [selectedPatient, setSelectedPatient] = useState({
        patient: '',
        patient_name: '',
        patient_plan: null
    });

    //Fechas y Horarios
    const date = new Date();
    //const dateFormat = format(date, 'dd/MM/yyyy');
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const [selectedDate, setSelectedDate] = useState(date);
    const [availableDays, setAvailableDays] = useState(selectedTickets.days ? selectedTickets.days : days);
    const [isAvailable, setIsAvailable] = useState(false);

    const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const [availableSchedules, setAvailableSchedules] = useState(selectedTickets.schedules ? selectedTickets.schedules : schedules);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    
    const [observations, setOvservations] = useState('');

    const handlePatientChange = (value) => {
        setSelectedPatient({
            patient: value.id,
            patient_name: value.full_name,
            patient_plan: null
        });
        setError(null);
    };

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

    const handleSchedulesChange = (e) => {
        setSelectedSchedule(e.target.value);   
    };

    const handlePlanChange = (value) => {
        if(value === 'Sin Plan') setSelectedPatient({
            ...selectedPatient,
            patient_plan: null
        })
        else setSelectedPatient({
            ...selectedPatient,
            patient_plan: value
        });
    };

    const onClickConfirm = async () => {

        if (!user.id || !selectedPatient.patient || !selectedDate || !selectedSchedule || !selectedTickets.code) {
            setError('Faltan datos obligatorios');
            return;
        };

        const ID = format(date, 'ddMMyyyyhhmmss');

        const ticketInfo = {
            id: ID,
            user: user.id,
            user_name: user.full_name,
            user_email: user.email,
            patient: selectedPatient.patient,
            patient_name: selectedPatient.patient_name,
            plan: selectedPatient.patient_plan,
            ticket:{
                type: ticket_type,
                title: selectedTickets.title || `Consulta Médica: ${selectedTickets.name}`,
                date: format(selectedDate, 'yyyy-MM-dd'),
                schedule: selectedSchedule,
                code: selectedTickets.code,
                price: selectedTickets.price,
                observations: observations.length ? observations : 'none'
            }
        };

        if(ticketInfo.ticket.type === 'Consulta Médica') {
            await axios.post('/ticketMedical/createTicketMedical', {
                title: ticketInfo.ticket.title,
                observations: ticketInfo.ticket.observations,
                day:selectedTickets.days,
                doctorId: ticketInfo.ticket.code,
                patientId: ticketInfo.patient,
                date: ticketInfo.ticket.date,
                hour: ticketInfo.ticket.schedule,
                paid: ticketInfo.plan ? ticketInfo.plan : null
            })
            .then((res) => {
                setMessage({
                    response: res.data,
                    ticket: ticketInfo.ticket.title,
                    date: format(parseISO(ticketInfo.ticket.date), 'dd/MM/yyyy'),
                    schedule: ticketInfo.ticket.schedule,
                    observation: !ticketInfo.plan ? 'Recuerde que debera abonar la consulta en el momento' : null
                });
                setIsTrue(true);
            })
            .catch((err) => {
                console.log(err);
                setMessage({...message, response: 'Ha ocurrido un error, intentelo más tarde'});
                setIsTrue(true);
            });
            setSelectedSchedule('');
            setAvailableSchedules(availableSchedules.filter((item) => item !== selectedSchedule));
            return ticketInfo;
        };

        if(ticketInfo.ticket.type === 'Análisis / Estudio' && ticketInfo.plan) { 
            console.log('El usuario tiene un plan valido');
            await axios.post('/ticketAnalysis/createTicketAnalisys', {
                title: ticketInfo.ticket.title,
                observations: ticketInfo.ticket.observations,
                idAnalysis: ticketInfo.ticket.code,
                idPatient: ticketInfo.patient,
                date: ticketInfo.ticket.date,
                hour: ticketInfo.ticket.schedule,
                price: ticketInfo.ticket.price
            })
            .then((res) => {
                setMessage({
                    response: res.data,
                    ticket: `Análisis / Estudio: ${ticketInfo.ticket.title}`,
                    date: format(parseISO(ticketInfo.ticket.date), 'dd/MM/yyyy'),
                    schedule: ticketInfo.ticket.schedule,
                    observation: null
                });
                setIsTrue(true);
            })
            .catch((err) => {
                console.log(err);
                setMessage('Ha ocurrido un error, intentelo más tarde');
                setIsTrue(true);
            });
            
            setSelectedSchedule('');
            setAvailableSchedules(availableSchedules.filter((item) => item !== selectedSchedule));
            return ticketInfo;
        };

        dispatch(postConfirmedTickets(ticketInfo));
        setMessage({
            response: 'Turno agregado a la lista',
            ticket: null,
            date: null,
            schedule: null,
            observation: '¿Quiere seguir agregando items o desea finalizar el proceso de confirmación del turno?'
        });
        setIsTrue(true);
        setSelectedSchedule('');
        setAvailableSchedules(availableSchedules.filter((item) => item !== selectedSchedule));
    };

    const handleCloseModal = () => {
        setIsTrue(false);
    };

    const onClickGoToPaid = () => {
        if(message.response === 'Turno creado exitosamente' || message.response === 'Ha ocurrido un error, intentelo más tarde') return navigate('/');
        
        const paymentItems = {
            analisys: userTickets.map((item) => {
                return { 
                    id: item.id,
                    title: item.ticket.title,
                    description: item.ticket.observations,
                    quantity: 1,
                    price: item.ticket.price
                };
            })
        };

        localStorage.setItem('payment_type', 'ticket');

        axios.post('/mercadoPago/v2', paymentItems)
            .then((res) => window.location.replace(res.data?.mpresult?.body.init_point))
            .catch((err) => console.log(err)); 
    };

    const onClickBackToSelect = () => {
        navigate(-1);
    }

    useLayoutEffect(() => {
        dispatch(getSelectedTickets());
        dispatch(getConfirmedTickets());
        dispatch(getPatients());
    }, []);

    useEffect(() => {
        dispatch(getPatientsById(selectedPatient.patient));
    }, [selectedPatient.patient]);

    useEffect(() => {
        if(confirmedTickets.length > 0) {
            localStorage.setItem('confirmedItems', JSON.stringify(confirmedTickets));
        }
    }, [confirmedTickets]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <div className={styles.container}>
                
                <h2>Selector de fecha y horario para el turno</h2>
                <p>Tipo de turno: {ticket_type}</p>

                {selectedTickets?.title && <p>{selectedTickets?.title}</p>}
                
                {selectedTickets?.name && <p>Profesional: {selectedTickets?.name} - {selectedTickets?.speciality[0].toUpperCase() + selectedTickets?.speciality.slice(1)}</p>}

                <p>Días:  {selectedTickets?.days?.join(' - ') || days?.join(' - ')}</p>

                <FormControl sx={{ m: 1, minWidth: 320 , textAlign: 'left' }} error={error === 'Faltan datos obligatorios'}>
                    <InputLabel id='select_patient'>{'Seleccione un paciente'}</InputLabel>
                    <Select
                        labelId='select_patient'
                        id='select'
                        label='Seleccione un paciente'
                        defaultValue={selectedPatient.patient_name}
                        onChange={(e) => handlePatientChange(e.target.value)}
                    >
                        {patients.map((item, index) => (
                            <MenuItem key={index} value={item}>{item.full_name}</MenuItem>
                        ))}
                    </Select>
                    {error === 'Faltan datos obligatorios' && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

                <DatePicker 
                    sx={{ m: 1, minWidth: 320 }}
                    label='Seleccione la fecha'
                    value={selectedDate}
                    slotProps={{
                        textField: {
                            error: error === 'El dia seleccionado no esta disponible',
                            helperText: error === 'El dia seleccionado no esta disponible' && error
                        }
                    }}
                    onChange={(value) => handleDateChange(value)}
                    disablePast
                />
                {isAvailable && 

                <FormControl sx={{ m: 1, minWidth: 320, textAlign: 'left' }} >
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
                </FormControl>

                }

                {selectedSchedule && 
                
                <FormControl sx={{ m: 1, minWidth: 320, textAlign: 'left' }}>
                    <InputLabel id='select_plan'>{'Seleccione un plan'}</InputLabel>
                    <Select
                        labelId='select_plan'
                        id='select'
                        label='Seleccione un plan'
                        value={selectedPatient.patient_plan ? selectedPatient.patient_plan : 'Sin Plan'}
                        onChange={(e) => handlePlanChange(e.target.value)}
                    >
                        {userInfo.plan && <MenuItem value={userInfo.plan.name}>{userInfo.plan.name}</MenuItem>}
                        <MenuItem value={'Sin Plan'}>Sin Plan</MenuItem>
                    </Select>
                </FormControl>

                }

                {selectedSchedule && <TextField
                        sx={{ m: 1, minWidth: 320, textAlign: 'left' }}
                        id='observations'
                        label='Observaciones'
                        placeholder=''
                        multiline
                        onChange={(e) => setOvservations(e.target.value)}
                />}

                {selectedSchedule && <Button variant='outlined' onClick={onClickConfirm} >Confirmar turno</Button>}

                {isTrue &&  
                <Dialog
                open={isTrue}
                onClose={null}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {message.response}
                    </DialogTitle>
                    <DialogContent>
                        {message.ticket && <DialogContentText id="alert-dialog-description">
                            {message.ticket}
                        </DialogContentText>}
                        {message.date && <DialogContentText id="alert-dialog-description">
                            Día: {message.date}
                        </DialogContentText>}
                        {message.schedule && <DialogContentText id="alert-dialog-description">
                            Hora: {message.schedule}
                        </DialogContentText>}
                        {message.observation && <DialogContentText id="alert-dialog-description">
                            {message.observation}
                        </DialogContentText>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClickBackToSelect}>Volver</Button>
                        <Button onClick={onClickGoToPaid} autoFocus>Finalizar</Button>
                    </DialogActions>
                </Dialog>
            }

            </div>
        </LocalizationProvider>
    )
};

export default TicketPicker;