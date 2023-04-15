import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserCard.module.css";
import { getUser } from "../../redux/actions";

const UserCard = () => {
  const dispatch = useDispatch();
  const datos = useSelector((state) => state.allUsers);

  useLayoutEffect(() => {
    dispatch(getUser());
  }, []);

  const handleCheckboxChange = (e, id) => {
    const { checked } = e.target;

    Swal.fire({
      title: "Está seguro ?",
      text: "No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, setear a admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUser(id, { isAdmin: checked }));
        Swal.fire(
          "Ahora es administrador!",
          "El usuario ah sido seteado.",
          "Exitosamente"
        ).then(() => {
          dispatch(getUser());
        });
      }
    });
  };

  return (
    <div className={styles.contenedor}>
      {console.log(datos)}
      {datos.map((dato) => (
        <div className={styles.card} key={dato.id}>

          {dato.image ? 
          <img
            src={
              dato.image

            }
            alt={dato.full_name}

            className={styles.image}
          />

        : 
        
        <img
        src={
          "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
        }
        alt="user"

        className={styles.image}
      />
        
        
        }
          <h2>{dato.full_name}</h2>
          <p>ID: {dato.id}</p>
          <p>Username: {dato.user_name}</p>
          <p>Email: {dato.email}</p>
          <p>Plan: {dato.is_plan_pay}</p>

          <label htmlFor={`check-card-${dato.id}`}>Es administrador</label>
          <input
            type="checkbox"
            id={`check-card-${dato.id}`}
            checked={dato.isAdmin}
            onChange={(e) => handleCheckboxChange(e, dato.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default UserCard;
