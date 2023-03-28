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
import { getAnalysis, getSpecialities } from './redux/actions';
import MedicalBook from './components/MedicalBook/MedicalBook';
import Specialitys from './components/Specialitys/Specialitys';

axios.defaults.baseURL = 'https://apiclinica.onrender.com/';

function App() {

  const dispatch = useDispatch();

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

        <Route path='/cartilla' element={<MedicalBook/>} />

        <Route path="/especialidad/:speciality" element={<Specialitys />} />


      </Routes>

      <Footer/>

    </>

  );
}

export default App;
