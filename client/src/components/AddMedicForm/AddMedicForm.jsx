import React, {useState} from 'react'
import styles from "./AddMedicForm.module.css";
import medicForm from "../../images/medico-form.jpg"


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
  if(!regex.test(inputs.nombre)){
    errors.nombre = "Nombre NO válido"
  }
    else if (inputs.nombre.length > 30) {
        errors.nombre = "Debe ingresar un nombre más corto";
      } 

      else if (inputs.edad < 18 || inputs.edad > 80 ) {
        errors.edad = "Debe ingresar una edad mayor o igual que 18 y menor que 80";
      } 

      else if (!isValidURL(inputs.imagen)) {
       errors.imagen = "La URL no es válida o no es una imagen JPG";
     }

    return errors;
  }


export default function AddMedicForm() {
  
  
  
    const [userDate, setUserDate] = useState({
        nombre: "",
        dni: "",
        edad:18,
        tel:"",
        direccion:"",
        imagen:"",
        especialidad:"",
        genero:""
        
      });
      
      const [especialidad, setEspecialidad] = useState("");
      const [genero, setGenero] = useState("");  

      const handleInputChange = (e) => {
        setUserDate({ ...userDate, [e.target.name]: e.target.value });
        setErrors(validate({ ...userDate, [e.target.name]: e.target.value }));
      }; 


      const [errors, setErrors] = useState({
        nombre: "",
        edad:"",
        tel:"",
        direccion:"",
        imagen:""
      });

const handleSelectChangeEspecialidad = (e)=>{


  setEspecialidad(e.target.value);


}

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
        //     "https://project-henry-videogames-production.up.railway.app/videogames",
        //     userDate
        //   );
        //   console.log(response.data);
        // } catch (error) {
        //   console.error(error.message);
        // }
    alert("Medico creado")
    setUserDate({ ...userDate, especialidad: especialidad });

    console.log(userDate)
      };






  return (
    <div className={styles.container__medic}>

<img src={medicForm} alt="" />

<div className={styles.container__medicForm}>

<h2>Agregar Médico </h2>

<form onSubmit={handleSubmit}>

<input type="text" name='nombre' placeholder='Nombre Completo' autoComplete='nop' required onChange={handleInputChange} value={userDate.nombre}/>


<input type="text" name='dni' placeholder='DNI' autoComplete='nop' maxlength="8" minlength="8" required onChange={handleInputChange} value={userDate.dni} />

<input type="number" name='edad' placeholder='Edad' autoComplete='nop' max={80} required  onChange={handleInputChange} value={userDate.edad} />

<input type="tel" name='tel' placeholder='Cel. Ej: (123) 456-7890' autoComplete='nop' min={10} required  onChange={handleInputChange} value={userDate.tel}/>
<input type="text" name='direccion' placeholder='Dirección' autoComplete='nop' required  onChange={handleInputChange} value={userDate.direccion}/>
<input type="text" name='imagen' placeholder='URL de la imagen' autoComplete='nop'required  onChange={handleInputChange} value={userDate.imagen}/>


<div className={styles.container__selects}>


<select value={especialidad} onChange={handleSelectChangeEspecialidad} >
    <option disabled selected>Especialidades</option>
{arraySpecialists.map(specialist => (
// con estos métodos, sacamos las mayusculas, los espacios y los acentos.
<option value={specialist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0300-\u036f]/g, "")}>{specialist}</option>

))}
</select>

<select >
    <option  disabled selected >Género</option>
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
    <option value="no-binario">No Binario</option>
</select>


</div>

    <button className={styles.btn__form} type='submit' disabled={Object.keys(errors).length > 0} >Crear Médico</button>


</form>

{errors.nombre && <p className={styles.errors}>{errors.nombre}</p>}
{errors.edad && <p className={styles.errors} >{errors.edad}</p>}
{errors.imagen && <p className={styles.errors} >{errors.imagen}</p>}


</div>





    </div>
  )
}
