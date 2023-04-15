// BORRADO DE MEDICO POR ID

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, deleteDoctor } from "../../redux/actions";
import style from "./DeleteDoctor.module.css";
import Swal from "sweetalert2";

const DeleteDoctor = () => {
  const [doctorID, setDoctorID] = useState("");
  const dispatch = useDispatch();
  // const [doctorInfo, setDoctorInfo] = useState({});
  // Obtener el médico desde el estado global
  const doctors = useSelector((state) => state.doctors);

  useEffect(() => {
    // setDoctorInfo(doctor[0])
    dispatch(getDoctors());
  }, []);

  // const handleSearch = e => {
  //   e.preventDefault();
  //   dispatch(getDoctorsByID(doctorID));
  // };

  const handleDelete = (e, data) => {
    e.preventDefault();
    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDoctor(data));
        Swal.fire("Eliminado!", "El médico ah sido eliminado.", "Exitosamente")
        .then(()=>{
          dispatch(getDoctors());

        })
      }
    });
  };

  return (
    <div className={style.container__deleteMedic}>
      <div className={style.tablesName}>
        <p>Perfíl</p>
        <p>Nombre</p>
        <p>Dirección</p>
        <p>Género</p>
        <p>Edad</p>
        <p>Matrícula</p>
        <p></p>
      </div>

      {doctors &&
        doctors.map((doctor) => (
          <div className={style.medicInfo}>
            <div className={style.container__image}>
              <img src={doctor.image} alt={doctor.full_name} />
            </div>
            <p>{doctor.full_name}</p>
            <p>{doctor.address}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.age}</p>
            <p>{doctor.code}</p>
            <button
              className={style.button}
              onClick={(e) => handleDelete(e, doctor.id)}
            >
              <i class="fas fa-trash-alt"> </i> Eliminar{" "}
            </button>
            {/* Puedes mostrar otros detalles del médico */}
          </div>
        ))}
    </div>
  );
};

export default DeleteDoctor;
