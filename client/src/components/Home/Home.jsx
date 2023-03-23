import React from 'react';
import Header from '../Header/Header';
import ContainerNews from '../News/ContainerNews';
import styles from "./Home.module.css";

export default function Home() {

// Aca va la logica

  return (
    
    <div className={styles.container__home}>

    <Header/>

    <ContainerNews />


    </div>
  )
}
