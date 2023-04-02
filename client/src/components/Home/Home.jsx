import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Cards from '../HomeCards/Cards'
import ContainerNews from '../News/ContainerNews2';
import Sponsors from '../Sponsors/Sponsors';
import styles from "./Home.module.css";
import Popup from '../PopUp/PopUp';


export default function Home() {

  const [buttonPopup, setButtonPopup] = useState(false)

  useEffect(()=> {
  setTimeout(()=>{
    setTimePopup(true);
  }, 7000)
},[]);

// Aca va la logica

  return (
    
    <div className={styles.container__home}>

    <Header/>

    <Cards/>

    <ContainerNews />

    <Sponsors />


    </div>
  )
}

{/* <br /><br />
<button onClick={()=>setButtonPopup(true)}>Contanos tu experiencia</button>
<Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
 <h4 className={styles.text}>Queremos conocer tu experiencia con Vitality para poder seguir mejorando </h4>
 <button className={styles.btn}>Completá el formulario</button>
 </Popup> */}