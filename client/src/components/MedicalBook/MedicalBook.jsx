import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialities, getAnalysis,getDoctors, getPlan, getFarmacy } from "../../redux/actions";
import style from '../MedicalBook/MedicalBook.module.css';

const MedicalBook = () => {
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.analysis);
  const specialities = useSelector((state) => state.specialities);
  const doctors= useSelector((state) => state.doctors);
  const plans= useSelector((state) => state.plans);
  const farmacies = useSelector((state) => state.farmacies);

  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFarmacy, setSelectedFarmacy] = useState("");

  useEffect(() => {
    dispatch(getAnalysis());
    dispatch(getSpecialities());
    dispatch(getDoctors());
    dispatch(getPlan());
    dispatch(getFarmacy());
  }, [dispatch]);

  return (
    <div className={style.firstDiv}>
      <h1 className={style.h1}>Cartilla médica</h1>
      
        <div className={style.secondDiv}>
          <label className={style.title}>Seleccione un análisis:</label>
          <select
            value={selectedAnalysis}
            onChange={(e) => setSelectedAnalysis(e.target.value)}
          >
            <option value="">Seleccione un análisis</option>
            {analysis?.map((analysis) => (
              <option key={analysis.id} value={analysis.id}>
                {analysis.title}
              </option>
            ))}
          </select>
        </div>
        <div className={style.secondDiv}>
          <label className={style.title}>Seleccione una especialidad:</label>
          <select
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
          >
            <option value="">Seleccione una especialidad</option>
            {specialities?.map((speciality) => (
              <option key={speciality.id} value={speciality.id}>
                {speciality}
              </option>
            ))}
          </select>
        </div>
        <div className={style.secondDiv}>
          <label className={style.title}>Seleccione un Profesional:</label>
          <select
            value={selectedDoctors}
            onChange={(e) => setSelectedDoctors(e.target.value)}
          >
            <option value="">Seleccione un medico</option>
            {doctors?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
        <div className={style.secondDiv}>
          <label className={style.title}>Seleccione un Plan:</label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">Seleccione un plan</option>
            {plans?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan}
              </option>
            ))}
          </select>
        </div>
        <div className={style.secondDiv}>
          <label className={style.title}>Seleccione una Farmacia:</label>
          <select
            value={selectedFarmacy}
            onChange={(e) => setSelectedFarmacy(e.target.value)}
          >
            <option value="">Seleccione una farmacia</option>
            {farmacies?.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>
       
      
    </div>
  );
};

export default MedicalBook;
