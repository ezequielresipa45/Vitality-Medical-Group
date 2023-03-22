import React from 'react'
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom';
import { useState } from 'react'

export default function NavBar() {

  let arraySpecialists =   [
    "Clínica Médica",
    "Kinesiología",
   "Neurología",
  "Otorrinolaringología",
    "Pediatría",
   "Psiquiatría",
    "Endocrinología",
    "Cardiología",
  ]

const [clickBoolean, setClickBoolean] = useState(false);


const handlerEspeciality = ()=> {
  
  clickBoolean ? setClickBoolean(false) : setClickBoolean(true);
  
  };


  return (
    <>
    <div className={styles.container__navbar}>

      <div className={styles.container__logo}>
        <Link>
      <img src={logo} alt="logo" />
      <p>Vitality Medical Group</p>
        </Link>
      </div>

<ul>
<Link to='*'>Inicio</Link>
<Link to='*'>Institucional</Link>
<Link to='*'>Novedades</Link>
<Link to='/'    style={clickBoolean ? {backgroundColor: "#639cc7", color:"#fff"} : {}}  onClick={handlerEspeciality} >Especialidades</Link>
<Link to='*'>Planes</Link>
</ul>
  </div>

{clickBoolean ? (<div className={styles.container__especialitys}>

<ul>
{arraySpecialists.map(specialist => (
  <Link>{specialist}</Link>
  ))}
  </ul>


</div>) : ''}

  </>
  )
}
