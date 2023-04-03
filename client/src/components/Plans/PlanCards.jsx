import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import {getPlans} from "../../redux/actions"
import PlanCard from "../Plans/PlanCard"
import style from "../Plans/PlanCard.module.css"


const PlanCards = () => {

  const plans = useSelector ((state)=> state.plans);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPlans());
  }, [dispatch])
console.log(plans)

  // const descriptions = ["Incluye atencion por urgencias las 24hs", "Analisis de laboratorio sin costo", "Atencion online 24hs"]
    return (
      <div>
        <h1 className={style.title}> PLANES PARA VOS</h1>
        <p>En nuestra clínica médica ofrecemos una amplia variedad de planes para cubrir todas las necesidades de nuestros pacientes. Contamos con opciones que van desde un plan básico para consultas de rutina hasta planes más completos que incluyen estudios de diagnóstico, tratamientos especializados y atención médica personalizada las 24 horas del día. Todos nuestros planes están diseñados para brindar la máxima calidad en atención médica, con un enfoque en la prevención y el cuidado integral de la salud. Además, nuestros especialistas están altamente capacitados y comprometidos con el bienestar de cada uno de nuestros pacientes, ofreciendo una atención cálida y personalizada en todo momento.</p>
      <div className={style.container}>

        {plans.map((p)=>(
          <PlanCard
          name = {p.name}
          description = {p.description}
          price = {p.price}
          />
        ))}
        
          {/* <PlanCard
            name= "PLAN JUVENIL VITAL"
            description = {descriptions}
            price = "1000$"    
            
          /> */}
    
          {/* <PlanCard
          name= "PLAN FAMILIAR VITAL"
          description = {descriptions}
          price = "5000$"
          />
  
          <PlanCard
            name= "PLAN ADULTO VITAL"
            description = {descriptions}
            price = "3000$"

          />  */}
          
          

          </div>
          </div>)
}
export default PlanCards