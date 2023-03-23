import React from "react";
import style from './Card.module.css';

const Card = ({ title, description, image }) => {
  return (
    <div className={style.content}>
      <img className={style.img} src={image}  />
      <div className={style.text}>
      <h2 className={style.h2} >{title}</h2>
      <p className={style.p}>{description}</p>
     </div>
    </div>
  );
};

export default Card;
