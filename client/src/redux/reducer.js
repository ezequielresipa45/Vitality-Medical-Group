import { GET_ANALYSIS , GET_SPECIALITIES, FILTER_ANALYSIS, GET_DOCTORS, GET_PLANS, GET_FARMACY, DELETE_DOCTOR, DELETE_PATIENT, GET_DOCTOR_BYID, GET_PATIENT_BYID, GET_REQUESTED_TICKETS , POST_REQUESTED_TICKETS , DELETE_REQUESTED_TICKETS } from "./actions";

const initialState = {
    specialities: [],
    analysis: [],
    filteredAnalysis: [],
    doctors: [],
    plans: [],
    farmacies: [],
    doctor: [],
    patient: [],
    requestedTickets: [],
    
  };
  
 
  const reducer = (state = initialState, action) => {
    switch (action.type) {

      // cases ....

      case GET_SPECIALITIES:
        return{
          ...state,
          specialities: action.payload
        };
      
      case GET_ANALYSIS:
        return{
          ...state,
          analysis: action.payload
        };

      case FILTER_ANALYSIS:
        return{
          ...state,
          filteredAnalysis: action.payload === 'Todos'
                              ? []
                              : state.analysis.filter((item) => item.speciality === action.payload)
        };

      case GET_DOCTORS:
        return{
          ...state,
          doctors: action.payload,
        };

      case GET_PLANS:
          return{
            ...state, 
            plans: action.payload,
          };

      case GET_FARMACY:
            return{
              ...state, 
              farmacies: action.payload,
            };

      case DELETE_DOCTOR:
              return{
                ...state,
                id: action.payload,
              };
      case DELETE_PATIENT:
                return{
                  ...state,
                  id: action.payload,
                };
      case GET_DOCTOR_BYID:
                return{
                  ...state,
                  doctor: action.payload,
                };

      case GET_PATIENT_BYID:
        return{
          ...state,
          patient: action.payload,
        };
      
      case GET_REQUESTED_TICKETS:
        return{
          ...state,
          requestedTickets: action.payload
        };

      case POST_REQUESTED_TICKETS:
        return{
          ...state,
          requestedTickets: [...state.requestedTickets, action.payload]
        };

      case DELETE_REQUESTED_TICKETS:
        return{
          ...state,
          requestedTickets: [...state.requestedTickets.filter((item) => item.code !== action.payload)]
        };
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducer;