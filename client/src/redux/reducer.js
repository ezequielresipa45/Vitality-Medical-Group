import { GET_ANALYSIS , GET_SPECIALITIES, FILTER_ANALYSIS, GET_DOCTORS, GET_PLANS, GET_FARMACY, DELETE_DOCTOR, DELETE_PATIENT, GET_DOCTOR_BYID, GET_PATIENT_BYID, GET_SELECTED_TICKETS , POST_SELECTED_TICKETS , DELETE_SELECTED_TICKETS, PUT_DOCTOR, GET_USER, PUT_PATIENT } from "./actions";

const initialState = {
    specialities: [],
    analysis: [],
    filteredAnalysis: [],
    doctors: [],
    plans: [],
    farmacies: [],
    doctor: [],
    patient: [],
    selectedTickets: [],
    allUsers: [],
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
      
      case GET_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: action.payload
        };

      case POST_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: [...state.selectedTickets, action.payload]
        };

      case DELETE_SELECTED_TICKETS:
        return{
          ...state,
          selectedTickets: [...state.selectedTickets.filter((item) => item.code !== action.payload)]
        };

      case PUT_DOCTOR:
        return{
          ...state,
          doctor: action.payload,
        };
      case GET_USER:
        return{
          ...state,
          allUsers: action.payload,
        };
      
      case PUT_PATIENT:
        return{
          ...state,
          patient: action.payload,
        }  
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducer;