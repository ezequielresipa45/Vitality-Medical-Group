import axios from 'axios';


const { VITE_URL_HOST_DB } = import.meta.env
const URL =  VITE_URL_HOST_DB || "http://localhost:3001"

export const GET_PATIENTS = "GET_PATIENTS";
export const GET_SPECIALITIES = 'GET_SPECIALITIES';
export const GET_ANALYSIS = 'GET_ANALYSIS';
export const FILTER_ANALYSIS = 'FILTER_ANALYSIS';
export const GET_DOCTORS="GET_DOCTORS";
export const GET_PLANS="GET_PLANS";
export const GET_FARMACY="GET_FARMACY";
export const DELETE_DOCTOR= "DELETE_DOCTOR";
export const DELETE_PATIENT= "DELETE_PATIENT";
export const GET_DOCTOR_BYID= "GET_DOCTOR_BYID";
export const GET_PATIENT_BYID= "GET_PATIENT_BYID";
export const GET_SELECTED_TICKETS = "GET_SELECTED_TICKETS";
export const POST_SELECTED_TICKETS = "POST_SELECTED_TICKETS";
export const DELETE_SELECTED_TICKETS = "DELETE_SELECTED_TICKETS";
export const GET_CONFIRMED_TICKETS = "GET_CONFIRMED_TICKETS";
export const POST_CONFIRMED_TICKETS = "POST_CONFIRMED_TICKETS";
export const DELETE_CONFIRMED_TICKETS = "DELETE_CONFIRMED_TICKETS";
export const PUT_DOCTOR= "PUT_DOCTOR";
export const PUT_PATIENT= "PUT_PATIENT";
export const GET_USER = "GET_USER";
export const PUT_USER = "PUT_USER";
export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
export const LOGOUT_LOGIN = "LOGOUT"
export const POST_COMMENT = "POST_COMMENT"
export const GET_COMMENTS = "GET_COMMENTS"
export const SORT_DOCTORS = "SORT_DOCTORS"
export const SORT_DOCTORS_BY_ID = "SORT_DOCTORS_BY_ID"
export const SORT_DOCTORS_BY_SPECIALTY = "SORT_DOCTORS_BY_SPECIALTY"
export const USER_UPDATE = "USER_UPDATE"

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

export function getDoctors(){
    return async function(dispatch){
      const json = await axios.get("https://apiclinica.onrender.com/doctor");

      return dispatch({
        type: GET_DOCTORS,
        payload: json.data,
      })
    }
};

export function getDoctorsByID(id){
  return async function(dispatch){
    const json= await axios.get(`https://apiclinica.onrender.com/doctor/${id}`);

    return dispatch({
      type: GET_DOCTOR_BYID,
      payload: json.data,
    })
  }
}
export function getPatients(){
  return async function(dispatch){
    const json= await axios.get(`https://apiclinica.onrender.com/patient`);

    return dispatch({
      type: GET_PATIENTS,
      payload: json.data,
    })
  }
}


export function getPatientsById(id){
  return async function(dispatch){
    const json= await axios.get(`https://apiclinica.onrender.com/patient/${id}`);

    return dispatch({
      type: GET_PATIENT_BYID,
      payload: json.data,
    })
  }
}

export function getPlans(){
  return async function(dispatch){
    const json = await axios.get("https://apiclinica.onrender.com/plan"); 

    return dispatch({
      type: GET_PLANS,
      payload: json.data,
    })
  }
    // return{
    //     type: GET_PLANS,
    //     payload: ["Juvenil", "Adulto", "Familiar", "Sin Plan"],
    // }
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

export function deleteDoctor(id){
  return async function(dispatch){
    const json = await axios.delete(`https://apiclinica.onrender.com/doctor/${id}/delete`);

    return dispatch({
      type: DELETE_DOCTOR,
      payload: json.data,
    })
  }
};
export function deletePatient(id){
  return async function(dispatch){
    const json = await axios.delete(`https://apiclinica.onrender.com/patient/${id}/delete`);

    return dispatch({
      type: DELETE_PATIENT,
      payload: json.data,
    })
  }
};

export function getSelectedTickets() {
  const value = JSON.parse(localStorage.getItem('selectedItems'));
  return {
      type: GET_SELECTED_TICKETS,
      payload: value
  }; 
};

export function postSelectedTickets(value) {
  return {
      type: POST_SELECTED_TICKETS,
      payload: value
  }; 
};

export function deleteSelectedTickets() {
  return {
      type: DELETE_SELECTED_TICKETS,
      payload: {}
  }; 
};

export function getConfirmedTickets() {
  const value = JSON.parse(localStorage.getItem('confirmedItems'));
  return {
      type: GET_CONFIRMED_TICKETS,
      payload: value
  }; 
};

export function postConfirmedTickets(value) {
  return {
      type: POST_CONFIRMED_TICKETS,
      payload: value
  }; 
};

export function deleteConfirmedTickets(value) {
  return {
      type: DELETE_CONFIRMED_TICKETS,
      payload: value
  }; 
};

export const putDoctor = (doctorData) => async (dispatch) => {
  
  const res = await axios.put(`https://apiclinica.onrender.com/doctor`, doctorData);
  
  // Dispatch a success action with the updated doctor data
  dispatch({
    type: 'PUT_DOCTOR',
    payload: res.data,
  });
  };

  export const putPatient = (patientData) => async (dispatch)=> {
    const res = await axios.put(`https://apiclinica.onrender.com/patient`, patientData);
  
    dispatch({
      type: 'PUT_PATIENT',
      payload: res.data,
    });
  };

  export function getUser(){
    return async function(dispatch){
      const json = await axios.get(`/user`);
  
      return dispatch({
        type: GET_USER,
        payload: json.data,
      });
    };
  };

  export const userUpdate = (id, data) => {
    return (dispatch) => {
      fetch(`https://apiclinica.onrender.com/user/isAdmin/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }), // incluir id y nuevo valor is_admin
      })
        .then((response) => response.json())
        .then((user) => dispatch(userUpdateSuccess(user)))
        .catch((error) => dispatch(userUpdateFailure(error)));
    };
  };

  export function loginByEmail(token, email){
    return async function(dispatch){
      const config = {
        url: `${URL}/login?email=${email}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      };
      const user = await axios(config) 
      return dispatch({
        type: LOGIN,
        payload: user.data,
      })
    }
  }

  export function signUp(token, data) {
    return async function (dispatch) {
      const config = {
        url: `${URL}/login`,
        method: "PUT",
        data: data,
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      }

      const user = await axios(config)
      return dispatch({
        type: SIGNUP,
        payload: user.data
      })
    }
  }

  export function logoutLogin(){
    console.log("Se cerro la sesion")
    return {
      type: LOGOUT_LOGIN
    }
  }


  export const postComment= (commentData) => async (dispatch) => {
  
  const res = await axios.post(`https://apiclinica.onrender.com/comment`, commentData);  // El post y le put son funciones asincronicas siempre
  dispatch({
    type: 'POST_COMMENT',
    payload: res.data,
  });
  };



  export function getComments(){
    return async function(dispatch){
      const json = await axios.get(`/comment`);
  
      return dispatch({
        type: GET_COMMENTS,
        payload: json.data,
      });
    };
  }


  export const sortDoctors = (orderBy) => {
    return {
      type: "SORT_DOCTORS",
      payload: orderBy
    };
  };
  

  export const sortDoctorsById = (order) => {
    return {
      type: "SORT_DOCTORS_BY_ID",
      payload: order,
    };
  };


  export const sortDoctorsBySpecialty = (order) => {
    return {
      type: "SORT_DOCTORS_BY_SPECIALTY",
      payload: order,
    };
  };