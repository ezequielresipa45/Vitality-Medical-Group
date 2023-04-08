import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Cards from '../HomeCards/Cards'
import ContainerNews from '../News/ContainerNews2';
import Sponsors from '../Sponsors/Sponsors';
import Popup from '../PopUp/PopUp';
import ExperienceForm from "../ExperienceForm/ExperienceForm.jsx"
import SearchContainer from '../Search/SearchContainer';

import styles from "./Home.module.css";


export default function Home() {

  const [buttonPopup, setButtonPopup] = useState(false)


// Aca va la logica

  return (
    
    <div className={styles.container__home}>

    <Header/>

    <br /><br /><br />
    <button onClick={()=>setButtonPopup(true)}>Contanos tu experiencia</button>
    <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>   
        <ExperienceForm/>
    </Popup>

    <SearchContainer />    

    <Cards/>

    <ContainerNews />

    <Sponsors />


    </div>
  )
}

//  <br /><br />
// <button onClick={()=>setButtonPopup(true)}>Contanos tu experiencia</button>
// <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
//  <h4 className={styles.text}>Queremos conocer tu experiencia con Vitality para poder seguir mejorando </h4>
//  <button className={styles.btn}>Completá el formulario</button>
//  </Popup>