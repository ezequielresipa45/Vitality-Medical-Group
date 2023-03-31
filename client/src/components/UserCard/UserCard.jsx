import React, {useState} from 'react';
import datos from './user.json';
import styles from './UserCard.module.css';


const UserCard = () => {

  const [check, setCheck] = useState(false);

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