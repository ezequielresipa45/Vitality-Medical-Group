import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Cards from '../HomeCards/Cards'
import ContainerNews from '../News/ContainerNews2';
import Sponsors from '../Sponsors/Sponsors';
import styles from "./Home.module.css";
import Popup from '../PopUp/PopUp';


export default function Home() {

  const [timePopup, setTimePopup] = useState(false)

  useEffect(()=> {
  setTimeout(()=>{
    setTimePopup(true);
  }, 7000)
},[]);

// Aca va la logica

  return (
    
    <div className={styles.container__home}>

    <Header/>
    
    <Popup trigger = {timePopup} setTrigger = {setTimePopup}>
      <h4 className={styles.text}>Queremos conocer tu experiencia con Vitality para poder seguir mejorando </h4>
      <button className={styles.btn}>Completá el formulario</button>
      </Popup>

    <Cards/>

    <ContainerNews />

    <Sponsors />


    </div>
  )
}
