import React from "react";
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import addMedic from "../../images/medical-doctor.png";

import { useAuth0 } from "@auth0/auth0-react"; // Import para Auth0
import LoginButton from "../LoginButtons/LoginButton";
import LogoutButton from "../LoginButtons/LogoutButton";
import TicketsDrawer from "../TicketsDrawer/TicketsDrawer";

export default function NavBar() {
  let arraySpecialists = [
    "Clínica Médica",
    "Traumatología ",
    "Neurología",
    "Otorrinolaringología",
    "Pediatría",
    "Psiquiatría",
    "Endocrinología",
    "Cardiología",
  ];

  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para controlar si el menú de especialidades está abierto o cerrado
  // Auth0
  const { user, isAuthenticated } = useAuth0();

  const [clickBoolean, setClickBoolean] = useState(false);

  const menuRef = useRef(null);

  const handlerEspeciality = () => {
    setMenuOpen(!isMenuOpen);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Cierra el menú de especialidades cuando se hace clic fuera de él
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            ref={menuRef}
            className={styles.button__ul}
            style={
              isMenuOpen
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

          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}

          {user && <TicketsDrawer />}
        </ul>

        {/* <Link to={"/agregarMedico"}>
          <img width={20} src={addMedic} alt="icon-addMedic" />
        </Link> */}
      </div>

      {isMenuOpen && (
        <div className={styles.container__especialitys} ref={menuRef}>
          <ul>
            {arraySpecialists.map((specialist) => (
              <li key={specialist} style={{ listStyleType: "none" }}>
                <Link to={`/especialidad/${specialist}`}>{specialist}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
