import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialities, getAnalysis } from "../../redux/actions";

const MedicalBook = () => {
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.analysis);
  const specialities = useSelector((state) => state.specialities);

  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  useEffect(() => {
    dispatch(getAnalysis());
    dispatch(getSpecialities());
  }, [dispatch]);

  return (
    <div>
      <h1>Cartilla médica</h1>
      <form>
        <div>
          <label>Seleccione un análisis:</label>
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
        <div>
          <label>Seleccione una especialidad:</label>
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
        <button type="submit">Agendar cita</button>
      </form>
    </div>
  );
};

export default MedicalBook;
