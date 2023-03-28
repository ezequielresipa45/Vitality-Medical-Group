import axios from 'axios';

export const GET_SPECIALITIES = 'GET_SPECIALITIES';
export const GET_ANALYSIS = 'GET_ANALYSIS';
export const FILTER_ANALYSIS = 'FILTER_ANALYSIS';
export const GET_DOCTORS="GET_DOCTORS";
export const GET_PLANS="GET_PLANS";
export const GET_FARMACY="GET_FARMACY";

export function getSpecialities() {
    return {
        type: GET_SPECIALITIES,
        payload: ['Cardiología', 'Endocrinología', 'Pediatría', 'Traumatología', 'Otorrinolaringología', 'Neurología', 'Clínica Médica', 'Psiquiatría']
    }; 
};

export function getAnalysis() {
    return {
        type: GET_ANALYSIS,
        payload: [{speciality:'Cardiología', title: 'Electrocardiograma'}, {speciality:'Endocrinología', title:'Tirotrofina basal (tsh)'}, {speciality:'Pediatría', title:'Screening Neonatal'}, {speciality:'Traumatología', title:'Resonancia magnética'}, {speciality:'Otorrinolaringología', title:'Rinoscopia'}, {speciality:'Neurología', title:'Electroencefalograma'}, {speciality:'Clínica Médica', title:'Hemograma completo'}, {speciality:'Psiquiatría', title:'Examen farmacológico y psicotropico'}]
    }; 
};

export function filterAnalysis(value) {
    return {
        type: FILTER_ANALYSIS,
        payload: value
    }; 
};


// export function getVideogames(){
//   return async function(dispatch) { 
//       const json = await axios.get("http://localhost:3001/videogames");//hago la peticion al back
      
      
//       return dispatch({ //armo la action 
//           type: 'GET_VIDEOGAMES',
//           payload: json.data
//       })
//   }
// };
export function getDoctors(){
    return async function(dispatch){
      const json = await axios.get("https://apiclinica.onrender.com/doctor");

      return dispatch({
        type: GET_DOCTORS,
        payload: json.data,
      })
    }
};

export function getPlan(){
    return{
        type: GET_PLANS,
        payload: ["Juvenil", "Adulto", "Familiar", "Sin Plan"],
    }
};

export function getFarmacy(){
    return{
        type: GET_FARMACY,
        payload:[
            {
              name: "Farmacia San Juan",
              address: "Av. 9 de Julio 1234, Buenos Aires",
              phone: "+54 11 5555-5555"
            },
            {
              name: "Farmacia del Sol",
              address: "Calle San Martín 432, Mendoza",
              phone: "+54 261 4444-4444"
            },
            {
              name: "Farmacia Santa María",
              address: "Av. Libertador 567, Córdoba",
              phone: "+54 351 3333-3333"
            },
            {
              name: "Farmacia Nueva Esperanza",
              address: "Av. Las Heras 789, Rosario",
              phone: "+54 341 2222-2222"
            },
            {
              name: "Farmacia La Paz",
              address: "Calle Belgrano 234, Salta",
              phone: "+54 387 1111-1111"
            }
          ]
          
    }
};