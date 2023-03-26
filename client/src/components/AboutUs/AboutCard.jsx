import React from "react";
import style from "../AboutUs/AboutCard.module.css"
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from "react-router-dom";


const AboutCard = ({ fullName,city, image, about, linkedin }) => {
  return (
    <div className={style.card}>
        <div className={style.front}> 
          <img src={image} />
        </div>
       
        <div className={style.back}>
          <h2>{fullName}</h2>
          
          <h5><PlaceIcon fontSize="large"/><br />{city}</h5>
          <h3>{about}</h3>
          {/* <a href={linkedin}></a> */}
          <Link to = {linkedin}></Link>
        </div>

    </div>
  );
};

export default AboutCard;
