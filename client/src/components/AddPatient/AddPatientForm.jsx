import React, { useState} from 'react';
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
  

 
  const [newPatient, setNewPatient] = useState({
    full_name: "",
    dni: "",
    age: "",
    phone: "",
    address: "",
    gender: "",
    birthday: "", 
    comments: "",
    plan:"",
    disease: ""

  });
  const handleReset = () => {
    setNewPatient({
      full_name: "",
      dni: "",
      age: "",
      phone: "",
      address: "",
      gender: "",
      birthday: "", 
      comments: "",
      plan:"",
      disease: ""
    });
  };
 // const handle agregar flia que con el onclick me mande cartelito diferente "puede agregar otro fliar"
// seetear formulario en cero.

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dni" || name === "age" ) { 
      setNewPatient({ ...newPatient, [name]: Number(value) }); // Convertir el valor a número antes de establecerlo en el estado
    } else {
      setNewPatient({ ...newPatient, [name]: value });
    }
    setErrors(validate({ ...newPatient, [name]: value }));
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
        newPatient
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
    handleReset()

    console.log(newPatient)
  };

  return (
    <div className={style.container__patient}>

        <img src={patientPic} alt="" />

      <div className={style.container__patient_form}>

        <h2>Formulario de paciente </h2>
        

        <form  onSubmit={handleSubmit}>

          <input type="text" name='full_name' placeholder='Nombre Completo' autoComplete='nop' required onChange={handleInputChange} value={newPatient.full_name} />

          <input type="number" name='dni' placeholder='DNI' autoComplete='nop' maxlength="8" minlength="8" required onChange={handleInputChange} value = {newPatient.dni} />

          <input type="number" name='age' placeholder='Edad' autoComplete='nop' required onChange={handleInputChange} value={newPatient.age} />

          <input type="date" name='birthday' autoComplete='nop' required onChange={handleInputChange} value={newPatient.birthday} />

          <input type="tel" name='phone' placeholder='Cel. Ej: (123) 456-7890' autoComplete='nop' minlength={10} required onChange={handleInputChange} value={newPatient.phone} />

          <input type="text" name='address' placeholder='Dirección' autoComplete='nop' required onChange={handleInputChange} value={newPatient.address} />


          <div className={style.container__selects}>

            <select name='gender' onChange={(e) => setNewPatient({...newPatient, gender: e.target.value })} value={newPatient.gender} >
              <option disabled value=''>Seleccionar género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no-binario">No Binario</option>
            </select>

            <select name='plan' onChange={(e) => setNewPatient({ ...newPatient, plan: e.target.value })} value={newPatient.plan} >
            <option disabled value=''>Seleccionar plan</option>
              <option value="vital">Vital</option>
              <option value="familiar">Vital Familiar</option>
              <option value="age">Vital Age</option>
            </select>
            <select name='disease' onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })} value={newPatient.disease} >
             <option disabled value=''>Enfermedades existentes</option>
              <option value="si">SI</option>
              <option value="no">NO</option>
            </select>

        </div>
          <div>
          <textarea className={style.input_comments} type="text" name= "comments" autoComplete= "nop" placeholder= "Especifique enfermedades ya exsistentes, embarazos en curso u otros comentarios" onChange={handleInputChange} value={newPatient.comments} />
          </div>

          <button className={style.btn__form} type='submit' disabled={Object.keys(errors).length > 0} >Agregar</button>
          <button  className={style.btn__form} type='submit' >Agregar familiar</button>
        </form>
       
        </div>

        {errors.full_name && <p className={style.errors}>{errors.full_name}</p>}
        {errors.age && <p className={style.errors} >{errors.age}</p>}

   


    </div>
  )
}