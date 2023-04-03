import React from 'react';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect } from 'react';
import { useLocation, Routes , Route } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import Home from "./components/Home/Home";
import Institutional from "./components/Institutional/Institutional";
import PlanCards from "./components/Plans/PlanCards"
import AboutCards from './components/About/AboutCards';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AddMedicForm from "./components/AddMedicForm/AddMedicForm";
import AnalysisContainer from "./components/Analysis/AnalysisContainer";
import { getAnalysis, getSpecialities, loginbyEmail} from './redux/actions';


import { useAuth0 } from "@auth0/auth0-react"; // Import para Auth0

function App() {
  
  const dispatch = useDispatch();

  // Todo sobre Auth0  
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect( () => {
    if(isAuthenticated){   
      const getToken = async () => {   
        const token = await getAccessTokenSilently();
        dispatch(loginbyEmail(token, user.email))        
      }   
      getToken();
    }
  }, [isAuthenticated])

  // Aca termina todo sobre Auth0
  


  useLayoutEffect(() => {
    dispatch(getSpecialities());
    dispatch(getAnalysis());
  }, []);
  
  return (

    <>

      <NavBar/>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/institucional" element={<Institutional />} />

        <Route path="/planes" element = {<PlanCards/>}/>

        <Route path ="/conocenos" element = {<AboutCards/>} />

        <Route path='/analisis' element={<AnalysisContainer/>} />

        <Route path='/agregarMedico' element={<AddMedicForm/>} />

      </Routes>

      <Footer/>

    </>

  );
}

export default App;
