import React from 'react'
import styles from "./Header.module.css";
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div className={styles.container__header}>

     

<div className={styles.container__boxs}>


<Link to='/cartilla' className={styles.container__boxs__box}>
    <i className='fa-solid fa-user-doctor'></i>
    <h3>Cartilla Médica</h3>
    <p>Guía que le permite al usuario y su grupo familiar acceder a todos los servicios que le ofrece Vitality Medical Group.</p>
  </Link>

  <Link to='' className={styles.container__boxs__box}>
    <i className='fa-solid fa-heart-pulse'></i>
    <h3>Turnos Clínicos</h3>
    <p>Los turnos clínicos son periodos de tiempo asignados donde un profesional de la salud atiende a los pacientes.</p>
  </Link>

  <Link to='/analisis' className={styles.container__boxs__box}>
    <i className='fa-solid fa-flask-vial'></i>
    <h3>Análisis Clínicos</h3>
    <p>Los análisis clínicos son procedimientos que se realizan en laboratorios para detectar y monitorear afecciones médicas.</p>
  </Link>

  <Link to=''className={styles.container__boxs__box}>
    <i className='fa-solid fa-comments'></i>
    <h3>Médico Online</h3>
    <p>Medico online es una forma de ofrecer asesoramiento médico a través del uso de internet.</p>
 </Link>


</div>

    </div>
  )
}
