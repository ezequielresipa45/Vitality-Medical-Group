import react from "react"
import style from "../Plans/PlanCard.module.css"
import Button from "@mui/material/Button"
import {Link} from "react-router-dom"
import img from "../../images/logo.png"
import img2 from "../../images/happy_doctors.avif"
import CheckIcon from '@mui/icons-material/Check';


const PlanCard = ({ name,description,price }) => {
    return (
       <div className ={style.background}>
         <div className={style.fondo}></div>
          <div>
              <div className={style.card}>
              <h3 className={style.name}>{name}</h3>
                  
                  <div className={style.left}> 
                      <img className={style.imagen}  src={img} alt="" />
                      <a href="/agregarPaciente">
                      <Button variant="outlined" >MI PLAN</Button></a>
                      <h4 className={style.price}>Precio: {price}</h4>
                  </div>

          <div className={style.right_text}>
            <h3><CheckIcon/>{description}</h3>
            {/* <ul className={style.right}>{description.map((item, index) => (
            <ul key={index}> <CheckIcon fontSize = "medium"/> {item} </ul> ))} </ul> */}

          </div>
        </div>

      </div>
    </div>

    );
  };
  
  export default PlanCard

  // el BOTON MI PLAN DEBE LLEVARME AL FORMULARIO DE CREAR PACIENTE