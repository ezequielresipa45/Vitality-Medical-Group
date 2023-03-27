import React, {useState} from 'react'
import styles from "./AddMedicForm.module.css";
import medicForm from "../../images/medico-form.jpg"
import Swal from 'sweetalert2'

function isValidURL(urlString) {

  if(urlString === '') return true;


  // Input check
  if (!urlString) return false;

  let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
  if(regexp.test(urlString)) {
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
  if(!regex.test(inputs.full_name)){
    errors.full_name = "Nombre NO válido"
  }
    else if (inputs.full_name.length > 30) {
        errors.full_name = "Debe ingresar un nombre más corto";
      } 

      else if (inputs.age < 18 || inputs.age > 80 ) {
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
        age:18,
        phone:"",
        address:"",
        image:"",
        specialities:"",
        gender:""
        
      });
      


      const handleInputChange = (e) => {
        setUserDate({ ...userDate, [e.target.name]: e.target.value });
        setErrors(validate({ ...userDate, [e.target.name]: e.target.value }));
      }; 


      const [errors, setErrors] = useState({
        full_name: "",
        age:"",
        phone:"",
        address:"",
        image:""
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
        // try {
        //   // Enviar la solicitud POST a la API
        //   const response = await axios.post(
        //     "http://localhost:3001/doctor/",
        //     userDate
        //   );
        //   console.log(response.data);
        // } catch (error) {
        //   console.error(error.message);
        // }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su médico ah sido creado.',
          showConfirmButton: false,
          timer: 1500
        })

    console.log(userDate)
      };







  return (
    <div className={styles.container__medic}>

<img src={medicForm} alt="" />

<div className={styles.container__medicForm}>

<h2>Agregar Médico </h2>

<form onSubmit={handleSubmit}>

<input type="text" name='full_name' placeholder='Nombre Completo' autoComplete='nop' required onChange={handleInputChange} value={userDate.full_name}/>


<input type="text" name='dni' placeholder='DNI' autoComplete='nop' maxlength="8" minlength="8" required onChange={handleInputChange} value={userDate.dni} />

<input type="number" name='age' placeholder='Edad' autoComplete='nop' max={80} required  onChange={handleInputChange} value={userDate.age} />

<input type="tel" name='phone' placeholder='Cel. Ej: (123) 456-7890' autoComplete='nop' min={10} required  onChange={handleInputChange} value={userDate.phone}/>
<input type="text" name='address' placeholder='Dirección' autoComplete='nop' required  onChange={handleInputChange} value={userDate.address}/>
<input type="text" name='image' placeholder='URL de la imagen' autoComplete='nop'required  onChange={handleInputChange} value={userDate.image}/>


<div className={styles.container__selects}>


<select name='specialities' onChange={(e) => setUserDate({ ...userDate, specialities: e.target.value })} value={userDate.specialities}  >
    <option disabled value=''>Seleccionar especialidades</option>
{arraySpecialists.map(specialist => (
// con estos métodos, sacamos las mayusculas, los espacios y los acentos.
<option value={specialist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0300-\u036f]/g, "")}>{specialist}</option>

))}
</select>

<select name='gender' onChange={(e) => setUserDate({ ...userDate, gender: e.target.value })} value={userDate.gender} >
  <option disabled  value=''>Seleccionar género</option>
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
