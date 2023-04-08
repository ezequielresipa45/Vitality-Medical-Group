import React, { useState } from 'react';
import styles from "./AddMedicForm.module.css";
import medicForm from "../../images/medico-form.jpg";
import Swal from 'sweetalert2';
import axios from 'axios';


function isValidURL(urlString) {

  if (urlString === '') return true;


  // Input check
  if (!urlString) return false;

  let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
  if (regexp.test(urlString)) {
    // Tests if the end of the string is .jpg
    if (urlString.endsWith('.jpg')) {
      return true;
    }
    else return false;
  }
  else return false;

}

function validate(inputs) {
  let errors = {};
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(inputs.full_name)) {
    errors.full_name = "Nombre NO válido"
  }
  else if (inputs.full_name.length > 30) {
    errors.full_name = "Debe ingresar un nombre más corto";
  }

  else if (inputs.age < 18 || inputs.age > 80) {
    errors.age = "Debe ingresar una edad mayor o igual que 18 y menor que 80";
  }

  else if (!isValidURL(inputs.image)) {
    errors.image = "La URL no es válida o no es una imagen JPG";
  }

  return errors;
}


export default function AddMedicForm() {



  const [userDate, setUserDate] = useState({
    full_name: "",
    dni: "",
    age: "",
    phone: "",
    address: "",
    image: "",
    specialities: [],
    gender: "",
    code: "",
    birthday: ""

  });


  const [userSpecialities, setUserSpecialities] = useState([]);


  const handleChangeSpecialities = (e)=>{
    const { name, value } = e.target;

    let newValues = [...userSpecialities, value];

    setUserSpecialities(newValues);


    setUserDate({ ...userDate, specialities: newValues });


  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dni" || name === "age" || name === "code") { // Verificar si el campo es dni, age o code
      setUserDate({ ...userDate, [name]: Number(value) }); // Convertir el valor a número antes de establecerlo en el estado
    }else if (name === "specialities"){

      const specialtiesArray = userDate.specialities; // Obtener el valor actual del array "specialities"
      const newSpeciality = value;
      const updatedSpecialities = [...specialtiesArray, newSpeciality]; // Agregar el nuevo valor ingresado al final del array
      setUserDate(prevState => ({ ...prevState, specialities: updatedSpecialities })); // Actualizar el estado "userDate" con el nuevo valor del array "specialities"
    }
    
    else {
      setUserDate({ ...userDate, [name]: value });
    }
    setErrors(validate({ ...userDate, [name]: value }));
  };


  const [errors, setErrors] = useState({
    full_name: "",
    age: "",
    phone: "",
    address: "",
    image: ""
  });



  let arraySpecialists = [
    "Clínica Médica",
    "Traumatologia ",
    "Neurología",
    "Otorrinolaringología",
    "Pediatría",
    "Psiquiatría",
    "Endocrinología",
    "Cardiología",
  ]




  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post(
        "doctor/",
        userDate
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Su médico ah sido creado.',
      showConfirmButton: false,
      timer: 800
    })

    console.log(userDate)
  };







  return (
    <div className={styles.container__medic}>

      <img src={medicForm} alt="" />

      <div className={styles.container__medicForm}>


        <form onSubmit={handleSubmit}>

          <input type="text" name='full_name' placeholder='Nombre Completo' autoComplete='nop' required onChange={handleInputChange} value={userDate.full_name} />
          <input type="number" name='code' placeholder='Code' autoComplete='nop' required onChange={handleInputChange} />
          <input type="date" name='birthday' autoComplete='nop' required onChange={handleInputChange} value={userDate.birthday} />


          <input type="number" name='dni' placeholder='DNI' autoComplete='nop' maxlength="8" minlength="8" required onChange={handleInputChange} />

          <input type="number" name='age' placeholder='Edad' autoComplete='nop' max={80} required onChange={handleInputChange} />

          <input type="tel" name='phone' placeholder='Cel. Ej: (123) 456-7890' autoComplete='nop' min={10} required onChange={handleInputChange} value={userDate.phone} />
          <input type="text" name='address' placeholder='Dirección' autoComplete='nop' required onChange={handleInputChange} value={userDate.address} />
          <input type="text" name='image' placeholder='URL de la imagen' autoComplete='nop' required onChange={handleInputChange} value={userDate.image} />


          <div className={styles.container__selects}>


            <select name='specialities' onChange={handleChangeSpecialities} value={userDate.specialities}  >
              <option disabled value=''>Seleccionar especialidades</option>
              {arraySpecialists.map(specialist => (
                // con estos métodos, sacamos las mayusculas, los espacios y los acentos.
                <option value={specialist.toLowerCase()}>{specialist}</option>

              ))}
            </select>

            <select name='gender' onChange={(e) => setUserDate({ ...userDate, gender: e.target.value })} value={userDate.gender} >
              <option disabled value=''>Seleccionar género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no-binario">No Binario</option>
            </select>


          </div>

          <button className={styles.btn__form} type='submit' disabled={Object.keys(errors).length > 0} >Crear Médico</button>


        </form>

        {errors.full_name && <p className={styles.errors}>{errors.full_name}</p>}
        {errors.age && <p className={styles.errors} >{errors.age}</p>}
        {errors.image && <p className={styles.errors} >{errors.image}</p>}


      </div>





    </div>
  )
}
