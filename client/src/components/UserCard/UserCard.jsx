import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserCard.module.css";
import { getUser } from "../../redux/actions";
import axios from "axios";

const UserCard = () => {
  const dispatch = useDispatch();
  const datos = useSelector((state) => state.allUsers);

  useLayoutEffect(() => {
    dispatch(getUser());
  }, []);

  const handleCheckboxChange = async (e, id) => {
    const { checked } = e.target;

    let userDate = {
      id,
      is_admin: checked,
    };

    try {
      // Enviar la solicitud POST a la API
      const response = await axios.put("user/isAdmin", userDate);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }

    dispatch(getUser());
  };

  return (
    <div className={styles.contenedor}>
      {console.log(datos)}
      {datos.map((dato) => (
        <div className={styles.card} key={dato.id}>
          {dato.image ? (
            <img
              src={dato.image}
              alt={dato.full_name}
              className={styles.image}
            />
          ) : (
            <img
              src={
                "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg"
              }
              alt="user"
              className={styles.image}
            />
          )}
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
