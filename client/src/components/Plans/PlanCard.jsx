import react from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {useEffect} from "react"
import { selectPlan } from "../../redux/actions";
import style from "../Plans/PlanCard.module.css"
import Button from "@mui/material/Button"
import img from "../../images/logo.png"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const PlanCard = ({ id, name,description,price }) => {

  const dispatch = useDispatch();


  const selectedPlan = {
    id: id,
    title: name,
    description: description,
    price: price,
    quantity: 1
  };

  const onClickPaid = async () => {
    localStorage.setItem('payment_type', 'plan');
    await axios.post('/mercadoPago/v2', {
         plan: [selectedPlan],
         
         })
        .then((res) => { 
          localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
          dispatch(selectPlan())
          window.location.replace(res.data?.mpresult?.body.init_point);
        
      })
      
        .catch((err) => console.log(err)); 
};

  const sentences = description.split(". ")

    return (
       <div className ={style.background}>
         <div className={style.fondo}></div>
          <div>
              <div className={style.card}>
              <h3 className={style.name}>{name}</h3>
                  
                  <div className={style.left}> 
                      <img className={style.imagen}  src={img} alt="" />
                      
                      <Button variant="outlined" onClick={onClickPaid} >MI PLAN</Button>
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

