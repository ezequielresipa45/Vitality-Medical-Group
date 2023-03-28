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
      <h1>{` ${speciality}`}</h1>
      <header></header>
       <section>
        {doctors && doctors.filter(doctor => doctor.specialities[0].speciality === speciality.toLocaleLowerCase()).map((doctor) =>(
        <div key={doctor.id}>
         <img width={100} src={doctor.image} alt={doctor.full_name} />   
        <h3>{doctor.full_name}</h3> 
        <h3>{doctor.gender}</h3> 
        <h3>{doctor.age}</h3> 
        <h3>{doctor.specialities[0].speciality}</h3> 
        </div>
        )
        
        )}
      </section> 
    </div>
  );
}
