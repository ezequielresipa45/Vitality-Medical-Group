import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, sortDoctors,sortDoctorsById,sortDoctorsBySpecialty } from "../../redux/actions";
import styles from "./GetDoctorsAdmin.module.css";

export default function GetDoctorsAdmin() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const [orderBy, setOrderBy] = useState(null); // Estado para el ordenamiento

  useEffect(() => {
    dispatch(getDoctors());
  }, []);



  // Función para manejar el clic en el botón de Nombre
  const orderbyName = () => {
    if (orderBy === "asc") {
      // Si ya está ordenado ascendentemente, cambiar a descendente
      setOrderBy("desc");
      dispatch(sortDoctors("desc")); // Llamar a la acción sortDoctors con el orden "desc"
    } else {
      // Si no está ordenado o está ordenado descendente, cambiar a ascendente
      setOrderBy("asc");
      dispatch(sortDoctors("asc")); // Llamar a la acción sortDoctors con el orden "asc"
    }
  };

  // Función para manejar el clic en el botón de ordenar por ID ascendente
  const handleSortByIdAsc = () => {
    dispatch(sortDoctorsById("asc"));
  };

  // Función para manejar el clic en el botón de ordenar por ID descendente
  const handleSortByIdDesc = () => {
    dispatch(sortDoctorsById("desc"));
  };

  // Función para manejar el clic en el botón de ordenar por especialidad
  const handleSortBySpecialty = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc"; // Obtener el nuevo orden
    dispatch(sortDoctorsBySpecialty(newOrder)); // Llamar a la acción sortDoctorsBySpecialty con el nuevo orden
    setOrderBy(newOrder); // Actualizar el estado de orderBy con el nuevo orden
  };



  return (
    <div className={styles.container__getDoctors}>
      <div className={styles.tablesName}>

<div>

        <button onClick={handleSortByIdDesc} className={styles.parrap}>Asc</button>
        <button onClick={handleSortByIdAsc} className={styles.parrap}>Desc</ button>

</div>


        <p>Perfíl</p>
        <button onClick={orderbyName} className={styles.parrap}>Nombre</button>
        <p>Dirección</p>
        <p>Género</p>
        <p>Edad</p>
        <p>Matrícula</p>

        <button onClick={handleSortBySpecialty} className={styles.parrap}>

        Especialidad

        </button>
  

      </div>

      {doctors &&
        doctors.map((doctor) => (
          <div className={styles.container__cardDoctor}>
            <p>{doctor.id}</p>
            <div className={styles.container__image}>
              <img src={doctor.image} alt={doctor.full_name} />
            </div>
            <p>{doctor.full_name}</p>
            <p>{doctor.address}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.age}</p>
            <p>{doctor.code}</p>
            <p>{doctor.specialities[0].speciality.charAt(0).toUpperCase() + doctor.specialities[0].speciality.slice(1)}</p>
          </div>
        ))}
    </div>
  );
}
