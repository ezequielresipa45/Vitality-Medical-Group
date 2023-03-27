import react from "react"
import style from "../Plans/PlanCard.module.css"
import Button from "@mui/material/Button"

const PlanCard = ({ name,icon, description, price, consultations_per_patient }) => {
    return (
       
      <div className={style.container}>
          <div className={style.card}>
          <div className={style.left}> 
            <h3>{name}</h3>
            <br />
            <h4>{icon}</h4>
          </div>
         
          <div className={style.right}>

            <p>{description}</p>
            <h4> Consultas Anuales: {consultations_per_patient}</h4>
            <h5>Cotizar desde: {price}</h5>
            <Button variant="outlined">MI PLAN</Button>
          
          </div>
          </div>
      </div>
      
    );
  };
  
  export default PlanCard