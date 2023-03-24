import React from 'react'
//import NavBar from '../NavBar/NavBar';
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container__header}>

     

<div className={styles.container__boxs}>

  <div className={styles.container__boxs__box}>
    <img src="*" alt="logo" />
    <h3>Cartilla Médica</h3>
    <p>Guía que le permite al usuario y su grupo familiar acceder a todos los servicios que le ofrece Vitality Medical Group</p>
  </div>

  <div className={styles.container__boxs__box}>
    <img src="*" alt="logo" />
    <h3>Turnos Clínicos</h3>
    <p>Guía que le permite al usuario y su grupo familiar acceder a todos los servicios que le ofrece Vitality Medical Group</p>
  </div>

  <div className={styles.container__boxs__box}>
    <img src="*" alt="logo" />
    <h3>Análisis Clínicos</h3>
    <p>Guía que le permite al usuario y su grupo familiar acceder a todos los servicios que le ofrece Vitality Medical Group</p>
  </div>

  <div className={styles.container__boxs__box}>
    <img src="*" alt="logo" />
    <h3>Médico Online</h3>
    <p>Guía que le permite al usuario y su grupo familiar acceder a todos los servicios que le ofrece Vitality Medical Group</p>
  </div>


</div>

    </div>
  )
}
