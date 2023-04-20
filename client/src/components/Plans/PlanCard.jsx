import react from "react"
import style from "../Plans/PlanCard.module.css"
import Button from "@mui/material/Button"
import img from "../../images/logo.png"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const PlanCard = ({ name,description,price }) => {

  const sentences = description.split(". ")

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
            {sentences.map((sentence, index)=>(
              <h3 key = {index}><CheckCircleIcon/>{sentence}</h3>
            ))}
          </div>
        </div>

      </div>
    </div>

    );
  };
  
  export default PlanCard

  // el BOTON MI PLAN DEBE LLEVARME AL FORMULARIO DE CREAR PACIENTE