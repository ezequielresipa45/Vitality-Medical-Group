import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserCard.module.css";
import { getUser, userUpdate } from "../../redux/actions";

const UserCard = () => {
  const dispatch = useDispatch();
  const datos = useSelector((state) => state.allUsers);

  useLayoutEffect(() => {
    dispatch(getUser());
  }, []);

  const handleButtonClick = (id, is_admin) => {
    const newIsAdmin = !is_admin;
    console.log(`is_admin: ${is_admin}, newIsAdmin: ${newIsAdmin}`);
    dispatch(userUpdate({ id, is_admin: newIsAdmin }));
  };

  return (
    <div className={styles.contenedor}>
      {datos.map((dato) => (
        <div className={styles.card} key={dato.id}>
          <img
            src={dato.image}
            alt={dato.full_name}
            width="250px"
            height="200px"
            className="imageUser"
          />
          <h2>{dato.full_name}</h2>
          <p>ID: {dato.id}</p>
          <p>Username: {dato.user_name}</p>
          <p>Email: {dato.email}</p>
          <p>Plan: {dato.is_plan_pay}</p>

          <label htmlFor={`check-card-${dato.id}`}>Es administrador </label>
          <button
            onClick={() => handleButtonClick(dato.id, dato.is_admin)}
            className={dato.is_admin ? styles.adminButton : styles.notAdminButton}
          >
            {dato.is_admin ? "Sí" : "No"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCard;