import React from 'react';
import { useState } from 'react';
import { LocalizationProvider , DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { FormControl , InputLabel , Select , MenuItem , FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { enGB, es } from 'date-fns/locale';
import styles from './TicketPicker.module.css';

export default function TicketPicker() {
    const date = new Date();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const availableDays = ['Lunes', 'Miercoles', 'Viernes'];
    const schedules = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    /* console.log(`${day} de ${month} del ${year}`); */
    
    const dateFormat = format(date, 'dd/MM/yyyy');

    const [availableSchedules, setAvailableSchedules] = useState(schedules);
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [error, setError] = useState(null);

    const availabilityValidator = (value) => {
        let days = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
        let userDate = new Date(value);
        console.log(userDate);
        console.log(days[userDate.getDay()]);
        if(availableDays.includes(days[userDate.getDay()])) {
            setIsAvailable(true);
            return setError(null);
        }
        else {
            setIsAvailable(false);
            return setError('El dia seleccionado no esta disponible')
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
        //setAvailableSchedules(availableSchedules.filter((item) => item !== e.target.value));
    };
    
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <div className={styles.container}>
                
                <h2>Selector de fecha y horario para el turno</h2>
                <DatePicker 
                    sx={{ m: 1, minWidth: 320 }}
                    label='Selecciona la fecha'
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

            </div>
        </LocalizationProvider>
    )
};
