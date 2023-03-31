import React, {useLayoutEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserCard.module.css';
import { getUser } from '../../redux/actions';


const UserCard = () => {

  const dispatch = useDispatch();
  const datos = useSelector((state) => state.allUsers);

  const [check, setCheck] = useState(false);
  useLayoutEffect(() => {
    dispatch(getUser())
  }, []);

  return(
    <div className={styles.contenedor}>
      {datos.map(dato => (
        <div className={styles.card}>
          <img
            src={dato.image}
            alt={dato.full_name}
            width="250px"
            heigth="200px"
            className="imageUser"
          />
          <h2>{dato.full_name}</h2>
          <p>ID: {dato.id}</p>
          <p>Username: {dato.user_name}</p>
          <p>Email: {dato.email}</p>
          <p>Plan: {dato.is_plan_pay}</p>

          <label htmlFor={`check-card-${dato.id}`}>Es administrador</label>
            <input
              type="checkbox"
              checked={check}
              onChange={(e) => setCheck(e.target.isAdmin)}
            />
        </div>
      ))}
    </div>
  );
}
export default UserCard;