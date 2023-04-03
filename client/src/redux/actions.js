import axios from 'axios';

const { VITE_URL_HOST_DB } = import.meta.env
const URL =  VITE_URL_HOST_DB || "http://localhost:3001"

export const GET_SPECIALITIES = 'GET_SPECIALITIES';
export const GET_ANALYSIS = 'GET_ANALYSIS';
export const FILTER_ANALYSIS = 'FILTER_ANALYSIS';

export function getSpecialities() {
    return {
        type: GET_SPECIALITIES,
        payload: ['Cardiología', 'Endocrinología', 'Pediatría', 'Traumatología', 'Otorrinolaringología', 'Neurología', 'Clínica Médica', 'Psiquiatría']
    }; 
};

export function getAnalysis() {
    return {
        type: GET_ANALYSIS,
        payload: [
            {speciality:'Cardiología', title: 'Electrocardiograma'}, {speciality:'Endocrinología', title:'Tirotrofina basal (tsh)'}, {speciality:'Pediatría', title:'Screening Neonatal'}, {speciality:'Traumatología', title:'Resonancia magnética'}, {speciality:'Otorrinolaringología', title:'Rinoscopia'}, {speciality:'Neurología', title:'Electroencefalograma'}, {speciality:'Clínica Médica', title:'Hemograma completo'}, {speciality:'Psiquiatría', title:'Examen farmacológico y psicotropico'},
            
            {speciality:'Cardiología', title: 'Eco doppler cardíaco'}, {speciality:'Endocrinología', title:'Aldosterona en orina'}, {speciality:'Pediatría', title:'Hemograma completo en niños'}, {speciality:'Traumatología', title:'Radiografía ósea'}, {speciality:'Otorrinolaringología', title:'Electronistagmograma'}, {speciality:'Neurología', title:'Sonografía'}, {speciality:'Clínica Médica', title:'Urinálisis completo'}, {speciality:'Psiquiatría', title:'Evaluación de salud mental'},

            {speciality:'Cardiología', title: 'Ecoestrés'}, {speciality:'Endocrinología', title:'Histamina en orina'}, {speciality:'Pediatría', title:'Glucemia en niños'}, {speciality:'Traumatología', title:'Espinograma'}, {speciality:'Otorrinolaringología', title:'Somnoscopia'}, {speciality:'Neurología', title:'Resonancia magnética cerebral'}, {speciality:'Clínica Médica', title:'Análisis básico metabólico'}, {speciality:'Psiquiatría', title:'Cortisol plasmático'},

            {speciality:'Cardiología', title: 'Holter cardíaco'}, {speciality:'Endocrinología', title:'Hormona foliculo estimulante (fsh)'}, {speciality:'Pediatría', title:'Examen general de orina'}, {speciality:'Traumatología', title:'Tomografía computarizada'}, {speciality:'Otorrinolaringología', title:'Sialografia'}, {speciality:'Neurología', title:'Electromiograma'}, {speciality:'Clínica Médica', title:'Ionograma'}, {speciality:'Psiquiatría', title:'Prueba de supresión con dexametasona'},

            {speciality:'Cardiología', title: 'Estudios electrofisiológicos'}, {speciality:'Endocrinología', title:'Progesterona en sangre'}, {speciality:'Pediatría', title:'Exudado faríngeo'}, {speciality:'Traumatología', title:'Exploración por ultrasonido'}, {speciality:'Otorrinolaringología', title:'Laringoscopia'}, {speciality:'Neurología', title:'Tomografía computarizada cerebral'},
            
            {speciality:'Cardiología', title:'Ergometría computarizada'}, {speciality:'Endocrinología', title:'Serotonina plaquetaria'}, {speciality:'Endocrinología', title:'Tiroglobulina'}, {speciality:'Endocrinología', title:'Tiroxina serica (t4)'}, {speciality:'Pediatría', title:'Examen coproparasitologico'}, {speciality:'Pediatría', title:'Hemocultivo'}, {speciality:'Pediatría', title:'Urocultivo'}
        ]
    }; 
};

export function filterAnalysis(value) {
    return {
        type: FILTER_ANALYSIS,
        payload: value
    }; 
};