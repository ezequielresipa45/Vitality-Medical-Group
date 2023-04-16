import React from 'react';
import { useState , useEffect , useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedTickets, postConfirmedTickets, getSelectedTickets, getPatients, getPatientsById } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider , DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { FormControl , InputLabel , Select , MenuItem , FormHelperText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import styles from './TicketPicker.module.css';

const TicketPicker = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const patients = useSelector((state) => state.patients.filter((item) => item.userId === user.id));

    const patientInfo = useSelector((state) => state.patient);

    console.log(patientInfo);

    const confirmedTickets = useSelector((state) => state.confirmedTickets);

    const selectedTickets = useSelector((state) => state.selectedTickets);
    
    const [isTrue, setIsTrue] = useState(false);
    
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
    const [error, setError] = useState(null);

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
        if(value === 'Particular - Sin Plan') setSelectedPatient({
            ...selectedPatient,
            patient_plan: null
        })
        else setSelectedPatient({
            ...selectedPatient,
            patient_plan: value
        });
    };

    const onClickConfirm = () => {

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
                date: format(selectedDate, 'dd/MM/yyyy'),
                schedule: selectedSchedule,
                code: selectedTickets.code,
                observations
            }
        };

        if(ticketInfo.ticket.type === 'Consulta Médica' && ticketInfo.plan) {
            //Verificar si tiene disponibilidad de turnos 
            console.log('El usuario tiene un plan valido - Turno confirmado');
            console.log(ticketInfo);
            setSelectedSchedule('');
            setAvailableSchedules(availableSchedules.filter((item) => item !== selectedSchedule));
            return ticketInfo;
        };

        dispatch(postConfirmedTickets(ticketInfo));
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
        navigate('/analisis');
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

                {ticket_type === 'Consulta Médica' && selectedSchedule && 
                
                <FormControl sx={{ m: 1, minWidth: 320, textAlign: 'left' }}>
                    <InputLabel id='select_plan'>{'Seleccione un plan'}</InputLabel>
                    <Select
                        labelId='select_plan'
                        id='select'
                        label='Seleccione un plan'
                        value={selectedPatient.patient_plan ? selectedPatient.patient_plan : 'Particular - Sin Plan'}
                        onChange={(e) => handlePlanChange(e.target.value)}
                    >
                        {patientInfo.plan && <MenuItem value={patientInfo.plan.name}>{patientInfo.plan.name}</MenuItem>}
                        <MenuItem value={'Particular - Sin Plan'}>Particular - Sin Plan</MenuItem>
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