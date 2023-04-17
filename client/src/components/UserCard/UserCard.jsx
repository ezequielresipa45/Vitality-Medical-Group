import React, {useLayoutEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserCard.module.css';
import { getUser, userUpdate } from '../../redux/actions';

const UserCard = () => {
  const dispatch = useDispatch();
  const datos = useSelector((state) => state.allUsers);

  useLayoutEffect(() => {
    dispatch(getUser())
  }, []);

  const handleButtonClick = (id) => {
    const newIsAdmin = !datos.find((dato) => dato.id === id).isAdmin;
    dispatch(userUpdate(id, { isAdmin: newIsAdmin }));
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
            onClick={() => handleButtonClick(dato.id)}
            className={dato.isAdmin ? styles.adminButton : styles.notAdminButton}
          >
            {dato.isAdmin ? "Sí" : "No"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCard;