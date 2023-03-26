import React from 'react'
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom';
import { useState } from 'react'
import addMedic from "../../images/medical-doctor.png"

export default function NavBar() {

  let arraySpecialists = [
    "Clínica Médica",
    "Traumatologia ",
    "Neurología",
    "Otorrinolaringología",
    "Pediatría",
    "Psiquiatría",
    "Endocrinología",
    "Cardiología",
  ]

  const [clickBoolean, setClickBoolean] = useState(false);

  const handlerEspeciality = () => {

    clickBoolean ? setClickBoolean(false) : setClickBoolean(true);

  };


  return (
    <>
      <div className={styles.container__navbar}>

        <div className={styles.container__logo}>
          <Link to='/'>
            <img src={logo} alt="logo" />
            <p>Vitality Medical Group</p>
          </Link>
        </div>

        <ul>
          <Link to='/'>Inicio</Link>
          <Link to='/institucional'>Institucional</Link>
          <Link to=''>Novedades</Link>
          <button className={styles.button__ul}  style={clickBoolean ? { backgroundColor: "#639cc7", color: "#fff",height: "100%", borderRadius:"0", border:"none" } : {}} onClick={handlerEspeciality} >Especialidades</button>
          <Link to=''>Planes</Link>
        </ul>

        <Link to={'/agregarMedico'}>
        <img width={20} src={addMedic} alt="icon-addMedic"  />
        
        </Link>
      </div>

      {clickBoolean ? (<div className={styles.container__especialitys}  >

        <ul>
          {arraySpecialists.map(specialist => (
            <Link>{specialist}</Link>
          ))}
        </ul>


      </div>) : ''}

    </>
  )
}
