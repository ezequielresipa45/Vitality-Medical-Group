import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import style from "../AddPatient/AddPatientForm.module.css"
import patientPic from "../../images/patientForm-img.jpeg"


function validate(inputs) {
  let errors = {};
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(inputs.full_name)) {
    errors.full_name = "Nombre NO válido"
  }
  else if (inputs.full_name.length > 30) {
    errors.full_name = "Debe ingresar un nombre más corto";
  }
  else if (inputs.age <= 18) {
    errors.age = "Debe ingresar una edad mayor o igual que 18";
  }

  return errors;
}


export default function AddPatientForm() {


  const [patientDate, setPatientDate] = useState({
    full_name: "",
    dni: "",
    age: "",
    phone: "",
    address: "",
    gender: "",
    birthday: "", 
    comments: ""

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dni" || name === "age" ) { // Verificar si el campo es dni, age o code
      setPatientDate({ ...patientDate, [name]: Number(value) }); // Convertir el valor a número antes de establecerlo en el estado
    } else {
      setPatientDate({ ...patientDate, [name]: value });
    }
    setErrors(validate({ ...patientDate, [name]: value }));
  };


  const [errors, setErrors] = useState({
    full_name: "",
    age: "",
    phone: "",
    address: "",
    birthday: ""
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post(
        "patient/",
        patientDate
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Gracias por elegirnos!',
      showConfirmButton: false,
      timer: 1500
    })

    console.log(patientDate)
  };


  return (
    <div className={style.container__patient}>

        <img src={patientPic} alt="" />

      <div className={style.container__patient_form}>

        <h2>Formulario de paciente </h2>

        <form onSubmit={handleSubmit}>

          <input type="text" name='full_name' placeholder='Nombre Completo' autoComplete='nop' required onChange={handleInputChange} value={patientDate.full_name} />

          <input type="number" name='dni' placeholder='DNI' autoComplete='nop' maxlength="8" minlength="8" required onChange={handleInputChange} />

          <input type="number" name='age' placeholder='Edad' autoComplete='nop' required onChange={handleInputChange} />

          <input type="date" name='birthday' autoComplete='nop' required onChange={handleInputChange} value={patientDate.birthday} />

          <input type="tel" name='phone' placeholder='Cel. Ej: (123) 456-7890' autoComplete='nop' minlength={10} required onChange={handleInputChange} value={patientDate.phone} />

          <input type="text" name='address' placeholder='Dirección' autoComplete='nop' required onChange={handleInputChange} value={patientDate.address} />


          <div className={style.container__selects}>

            <select name='gender' onChange={(e) => setPatientDate({ ...userDate, gender: e.target.value })} value={patientDate.gender} >
              <option disabled value=''>Seleccionar género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no-binario">No Binario</option>
            </select>

            <textarea className={style.input_comments} type="text" name= "comments" autoComplete= "nop" placeholder= "Información adicional: enfermedades ya exsistentes, embarazos en curso, etc" required onChange={handleInputChange} value={patientDate.comments} />

          </div>

          <button className={style.btn__form} type='submit' disabled={Object.keys(errors).length > 0}>Agregar</button>

        </form>

        {errors.full_name && <p className={style.errors}>{errors.full_name}</p>}
        {errors.age && <p className={style.errors} >{errors.age}</p>}

      </div>


    </div>
  )
}