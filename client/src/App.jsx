import React from 'react';
import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalysis, getConfirmedTickets, getSpecialities, loginByEmail, putUser } from './redux/actions';
import Home from "./components/Home/Home";
import Institutional from "./components/Institutional/Institutional";
import PlanCards from "./components/Plans/PlanCards"
import AboutCards from './components/About/AboutCards';
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AddMedicForm from "./components/AddMedicForm/AddMedicForm";
import AddPatientForm from './components/AddPatient/AddPatientForm';
import AnalysisContainer from "./components/Analysis/AnalysisContainer";
import MedicalBook from './components/MedicalBook/MedicalBook';
import Specialitys from './components/Specialitys/Specialitys';
import PatientPut from './components/PatientPut/PatientPut';
// import DeletePatient from './DeletePatient/DeletePatient';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import TicketPicker from './components/Tickets/TicketPicker';
import UserCard from './components/UserCard/UserCard';
import TicketsDrawer from './components/TicketsDrawer/TicketsDrawer';

import { useAuth0 } from "@auth0/auth0-react"; // Import para Auth0

axios.defaults.baseURL = 'https://apiclinica.onrender.com/';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const userInfo = useSelector((state) => state.user);

  useLayoutEffect(() => {
    dispatch(getSpecialities());
    dispatch(getAnalysis());
    localStorage.getItem('confirmedItems') && dispatch(getConfirmedTickets());
  }, []);

  // Todo sobre Auth0  
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect( () => {
    if(isAuthenticated){   
      const getToken = async () => {   
        const token = await getAccessTokenSilently();
        dispatch(loginByEmail(token, user.email))        
      }   
      getToken();
    }
  }, [isAuthenticated])
 
  // Aca termina todo sobre Auth0

  // Este useEffect es para que cuando se cree una nueva cuenta con auth0 se almacene la información basica del usuario
  // Descomentar cunado se haya manejado la action y que la bdd permita modificar la info del user
  /* useEffect(() => {
    !userInfo.full_name && dispatch(putUser({
      id: userInfo.id,
      full_name: user.name,
      user_name: user.nickname,
      image: user.picture
    }))
  }, [userInfo]); */

  return (

    <>

      {!isAdmin && <NavBar />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/institucional" element={<Institutional />} />

        <Route path="/planes" element={<PlanCards />} />

        <Route path="/conocenos" element={<AboutCards />} />

        <Route path='/analisis' element={<AnalysisContainer />} />

        <Route path='/agregarMedico' element={<AddMedicForm />} />

        <Route path='/agregarPaciente' element={<AddPatientForm />} />

        <Route path='/cartilla' element={<MedicalBook />} />

        <Route path="/especialidad/:speciality" element={<Specialitys />} />

        <Route path='/admin' element={<AdminDashboard />} />
        
        <Route path='/turnos' element={<TicketPicker />} />

        <Route path='/putpatient' element= {<PatientPut/>}/>

        <Route path='/administrador' element= {<UserCard/>}/>

        {/* <Route path='/adminDelete' element= {<DeletePatient/>}/> */}
        

      </Routes>

      {!isAdmin && <Footer />}

    </>

  );
}

export default App;
