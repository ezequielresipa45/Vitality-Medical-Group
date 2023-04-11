import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, getFarmacy  } from '../../redux/actions';
import SearchContainer from '../Search/SearchContainer';
import style from './MedicalBook.module.css';

const itemsPerPage = 4; // number of items to show per page

const MedicalBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
    
  const pharmacies = useSelector((state)=> state.farmacies);
  const doctors = useSelector((state)=> state.doctors);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFarmacy());
    dispatch(getDoctors());
  }, [dispatch]);

  // logic for rendering items on current page
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;
  const currentPharmacies = pharmacies.slice(startItem, endItem);
  const currentDoctors = doctors.slice(startItem, endItem);

  // logic for calculating total number of pages
  const maxItems = Math.max(pharmacies.length, doctors.length);
  const totalPages = Math.ceil(maxItems / itemsPerPage);

  return (
    <div className={style.firstDiv}>

      <SearchContainer />

      <h2 className={style.h2}>Farmacias</h2>
      { currentPharmacies.map((pharmacy, index) => (
        <div className={style.divCard} key={index}>
          <h3>{pharmacy.name}</h3>
          <p>Dirección: {pharmacy.address}</p>
          <p>Teléfono: {pharmacy.phone}</p>
        </div>
      ))}
      <h2 className={style.h2}>Doctores</h2>
      {currentDoctors.map((doctor, index) => (
        <div className={style.divCard} key={index}>
          <h3>{doctor.full_name}</h3>
          <p>Especialidad: {doctor.specialities.map((esp)=> esp.speciality)}</p>
          <p>Teléfono: {doctor.phone}</p>
          <p>Dirección: {doctor.address}</p>
        </div>
      ))}
      <div className={style.buttonDiv}>
        <button className={style.button} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span className={style.span}>Página {currentPage} de {totalPages}</span>
        <button className={style.button} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
}

export default MedicalBook;





// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSpecialities, getAnalysis,getDoctors, getPlan, getFarmacy } from "../../redux/actions";
// import style from '../MedicalBook/MedicalBook.module.css';

// //si es un plan solo debe seleccionarlo
// //si son Farmacias devuelve la info harc de farmacias
// //si son especialidades debe mostrarme todos los medicos de esa especialidad y 
// //sus respectivas turneras
// //si es un medico debe render la info con su turnera
// // si son analisis debe renderizarme todos los analisis o solo los de esa espacialidad

// const MedicalBook = () => {
//   const dispatch = useDispatch();
//   const analysis = useSelector((state) => state.analysis);
//   const specialities = useSelector((state) => state.specialities);
//   const doctors= useSelector((state) => state.doctors);
//   const plans= useSelector((state) => state.plans);
//   const farmacies = useSelector((state) => state.farmacies);

//   const [selectedAnalysis, setSelectedAnalysis] = useState("");
//   const [selectedSpeciality, setSelectedSpeciality] = useState("");
//   const [selectedDoctors, setSelectedDoctors] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [selectedFarmacy, setSelectedFarmacy] = useState("");

//   useEffect(() => {
//     dispatch(getAnalysis());
//     dispatch(getSpecialities());
//     dispatch(getDoctors());
//     dispatch(getPlan());
//     dispatch(getFarmacy());
//   }, [dispatch]);

//   return (
//     <div className={style.firstDiv}>
//       <h1 className={style.h1}>Cartilla médica</h1>
      
//         <div className={style.secondDiv}>
//           <label className={style.title}>Seleccione un análisis:</label>
//           <select
//             value={selectedAnalysis}
//             onChange={(e) => setSelectedAnalysis(e.target.value)}
//           >
//             <option value="">Seleccione un análisis</option>
//             {analysis?.map((analysis) => (
//               <option key={analysis.id} value={analysis.id}>
//                 {analysis.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={style.secondDiv}>
//           <label className={style.title}>Seleccione una especialidad:</label>
//           <select
//             value={selectedSpeciality}
//             onChange={(e) => setSelectedSpeciality(e.target.value)}
//           >
//             <option value="">Seleccione una especialidad</option>
//             {specialities?.map((speciality) => (
//               <option key={speciality.id} value={speciality.id}>
//                 {speciality}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={style.secondDiv}>
//           <label className={style.title}>Seleccione un Profesional:</label>
//           <select
//             value={selectedDoctors}
//             onChange={(e) => setSelectedDoctors(e.target.value)}
//           >
//             <option value="">Seleccione un medico</option>
//             {doctors?.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>
//                 {doctor}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={style.secondDiv}>
//           <label className={style.title}>Seleccione un Plan:</label>
//           <select
//             value={selectedPlan}
//             onChange={(e) => setSelectedPlan(e.target.value)}
//           >
//             <option value="">Seleccione un plan</option>
//             {plans?.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={style.secondDiv}>
//           <label className={style.title}>Seleccione una Farmacia:</label>
//           <select
//             value={selectedFarmacy}
//             onChange={(e) => setSelectedFarmacy(e.target.value)}
//           >
//             <option value="">Seleccione una farmacia</option>
//             {farmacies?.map((farm) => (
//               <option key={farm.id} value={farm.id}>
//                 {farm.name}
//               </option>
//             ))}
//           </select>
//         </div>
       
      
//     </div>
//   );
// };

// export default MedicalBook;
