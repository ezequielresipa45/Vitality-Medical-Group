import React from 'react';
import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalysis, getConfirmedTickets, getSpecialities } from './redux/actions';
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
import ExperienceForm from "./components/ExperienceForm/ExperienceForm"


axios.defaults.baseURL = 'https://apiclinica.onrender.com/';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const userTickets = useSelector((state) => state.confirmedTickets);

  useLayoutEffect(() => {
    dispatch(getSpecialities());
    dispatch(getAnalysis());
    localStorage.getItem('confirmedItems') && dispatch(getConfirmedTickets());
  }, []);

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
        
        <Route path= "/experiencia" element= {< ExperienceForm/>}/>

      </Routes>

      <TicketsDrawer />

      {!isAdmin && <Footer />}

    </>

  );
}

export default App;
