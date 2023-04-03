import styles from "./Specialitys.module.css";
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../redux/actions";

export default function Specialitys() {
  const { speciality } = useParams();

  const doctors = useSelector((state) => state.doctors);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

console.log(doctors.filter(doctor => doctor.specialities[0].speciality === speciality.toLocaleLowerCase()))



  return (
    <div className={styles.container__speciality}>
      {/* <h1>{` ${speciality}`}</h1> */}
      <header>      
        
        
      <h2>Profesionales</h2>
          <hr />
         <section>
        {doctors && doctors.filter(doctor => doctor.specialities[0].speciality === speciality.toLocaleLowerCase()).map((doctor) =>(
        <div key={doctor.id} className = {styles.cardMedic__container}>

         <img width={120} src={doctor.image} alt={doctor.full_name} />   
        <h3>{doctor.full_name}</h3> 
        <h4>{doctor.specialities[0].speciality}</h4> 
        {/* <h3>{doctor.gender}</h3>  */}
        {/* <h3>{doctor.age}</h3>  */}
        <button>Pedí un turno</button>
        </div>
        )
          
        )}
      </section> </header>
      {doctors.length === 0 && (
        <div>
            Cargando...
        </div>
      )}

    </div>
  );
}
