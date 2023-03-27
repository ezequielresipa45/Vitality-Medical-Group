import PlanCard from "../Plans/PlanCard"
import style from "../Plans/PlanCard.module.css"
import PersonIcon from '@mui/icons-material/Person';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleIcon from '@mui/icons-material/People';

const PlanCards = () => {
    return (
      <div className={style.container}>
        
        
          <PlanCard

            name= "INDIVIDUAL"
            icon= {<PersonIcon/>}
            description = "Plan para una sola persona"
            price = "1000"
            consultations_per_patient = "25"
            
      />
  
          <PlanCard
          name= "DUO"
          icon = {< PeopleIcon/>}
          description = "Plan para dos personas pueden ser familiares, amigxs, pareja."
          price = "2000"
          consultations_per_patient = "30"
          />
  
          <PlanCard
            name= "FAMILIAR"
            icon = {< Diversity3Icon/>}
            description = "Plan para personas dentro del mismo grupo familiar"
            price = "5000"
            consultations_per_patient = "40"
          /> 
          
          </div>)
}
export default PlanCards