import React from 'react';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect } from 'react';
import { useLocation, Routes , Route } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import Home from "./components/Home/Home";
import Institutional from "./components/Institutional/Institutional";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AnalysisContainer from "./components/Analysis/AnalysisContainer";
import { getAnalysis, getSpecialities } from './redux/actions';

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

        <Route path="/Institucional" element={<Institutional />} />

        <Route path='/analisis' element={<AnalysisContainer/>} />

      </Routes>

      <Footer/>

    </>

  );
}

export default App;
