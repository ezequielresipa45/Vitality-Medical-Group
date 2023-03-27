import { GET_ANALYSIS , GET_SPECIALITIES, FILTER_ANALYSIS, GET_DOCTORS, GET_PLANS, GET_FARMACY } from "./actions";

const initialState = {
    specialities: [],
    analysis: [],
    filteredAnalysis: [],
    doctors: [],
    plans: [],
    farmacies: [],
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
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducer;