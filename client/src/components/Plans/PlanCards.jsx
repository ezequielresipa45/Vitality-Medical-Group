import PlanCard from "../Plans/PlanCard"
import style from "../Plans/PlanCard.module.css"
import img2 from "../../images/happy_doctors.avif"


const PlanCards = () => {

  const descriptions = ["Incluye atencion por urgencias las 24hs", "Analisis de laboratorio sin costo", "Atencion online 24hs"]
    return (
      <div className={style.container}>
        
          <PlanCard
            name= "PLAN VITAL"
            description = {descriptions}
            price = "1000$"    
            
          />
    
          <PlanCard
          name= "PLAN FAMILIA VITAL"
          description = {descriptions}
          price = "5000$"
          />
  
          <PlanCard
            name= "PLAN AGE VITAL"
            description = {descriptions}
            price = "3000$"

          /> 
          
          

          
          </div>)
}
export default PlanCards