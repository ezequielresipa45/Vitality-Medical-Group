import { GET_ANALYSIS , GET_SPECIALITIES, FILTER_ANALYSIS, LOGIN_BY_EMAIL, LOGOUT } from "./actions";

const initialState = {
    specialities: [],
    analysis: [],
    filteredAnalysis: [],
    user: {}
  };
  
 
  const reducer = (state = initialState, action) => {
    switch (action.type) {

      // cases ....
      case LOGIN_BY_EMAIL:
        return{
          ...state,
          user: action.payload
        };
      
      case LOGOUT:
        return {
          ...state,
          user: {}
        }

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
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default reducer;