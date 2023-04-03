import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../redux/actions";
import styles from "./GetDoctorsAdmin.module.css";

export default function GetDoctorsAdmin() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(getDoctors());
    console.log(doctors);
  }, []);

  return (
    <div className={styles.container__getDoctors}>
      <div className={styles.tablesName}>
        <p>Perfíl</p>
        <p>Nombre</p>
        <p>Dirección</p>
        <p>Género</p>
        <p>Edad</p>
        <p>Matrícula</p>
        <p>Especialidad</p>
        
      </div>

      {doctors &&
        doctors.map((doctor) => (
          <div className={styles.container__cardDoctor}>
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
