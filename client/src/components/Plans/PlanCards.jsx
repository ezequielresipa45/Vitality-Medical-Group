import PlanCard from "../Plans/PlanCard"
import style from "../Plans/PlanCard.module.css"


const PlanCards = () => {

  const descriptions = ["Incluye atencion por urgencias las 24hs", "Analisis de laboratorio sin costo", "Atencion online 24hs"]
    return (
      <div className={style.container}>
        
          <PlanCard
            name= "PLAN JUVENIL VITAL"
            description = {descriptions}
            price = "1000$"    
            
          />
    
          <PlanCard
          name= "PLAN FAMILIAR VITAL"
          description = {descriptions}
          price = "5000$"
          />
  
          <PlanCard
            name= "PLAN ADULTO VITAL"
            description = {descriptions}
            price = "3000$"

          /> 
          
          

          
          </div>)
}
export default PlanCards