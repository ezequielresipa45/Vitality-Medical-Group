import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import addMedic from "../../images/medical-doctor.png";

import { useAuth0 } from "@auth0/auth0-react"; // Import para Auth0
import LoginButton from "../LoginButtons/LoginButton"
import LogoutButton from "../LoginButtons/LogoutButton"

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
  ];

  
   // Todo sobre Auth0  
   const { isAuthenticated } = useAuth0();


  const [clickBoolean, setClickBoolean] = useState(false);

  const handlerEspeciality = () => {
    clickBoolean ? setClickBoolean(false) : setClickBoolean(true);
  };

  function scrollToMiddle() {
    const middlePosition = window.innerHeight / 0.49; // Obtiene la mitad de la altura de la ventana
    window.scrollTo({
      top: middlePosition,
      behavior: "smooth", // Permite un desplazamiento suave hacia la posición especificada
    });
  }

  const handlerClickButtonNovedades = () => {
    scrollToMiddle();
  };

  return (
    <>
      <div className={styles.container__navbar}>
        <div className={styles.container__logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <p>Vitality Medical Group</p>
          </Link>
        </div>

        <ul>
          <Link to="/">Inicio</Link>
          <Link to="/institucional">Institucional</Link>
          <Link to="/" onClick={handlerClickButtonNovedades}>
            Novedades
          </Link>
          <button
            className={styles.button__ul}
            style={
              clickBoolean
                ? {
                    backgroundColor: "#639cc7",
                    color: "#fff",
                    height: "100%",
                    borderRadius: "0",
                    border: "none",
                  }
                : {}
            }
            onClick={handlerEspeciality}
          >
            Especialidades
          </button>
          <Link to="/planes">Planes</Link>
          
      <div>
        {!isAuthenticated  ? <LoginButton/>
                          : <LogoutButton/>}
      </div>
        </ul>

        {/* <Link to={"/agregarMedico"}>
          <img width={20} src={addMedic} alt="icon-addMedic" />
        </Link> */}
      </div>

      {clickBoolean ? (
        <div className={styles.container__especialitys}>
          <ul>
            {arraySpecialists.map((specialist) => (
              <Link to={`/especialidad/${specialist}`}>{specialist}</Link>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
