import React from 'react';
import { useState } from 'react';
import style from "../UserExperience/UserExpForm.module.css"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import img from "../../images/experience-img2.jpeg"
// import {useHistory} from "react-router-dom"

function validate(form) {  // funcion para validar el formulario
    let error = {};
    if (!form.name) {
      error.name = "Nombre requerido";
    }else if (form.name.length > 30){
            error.name = "Debo ingresar un nombre mas corto"
        }
    
    if (!form.email) {
      error.email = "Email requerido";
    
    }
   
    return error;
  }


export default function ExperienceForm () {
    
    // const history = useHistory()

    const [errors, setErrors] = useState({  // este es el estado de errores
        name: "",
       email: ""
    })     

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        selection: []
    })
     
    const handleInputChange = (e) =>{
        
        setErrors(                  // primero le paso los errores para que primer vea si hay error y frene antes.
        validate({
            ...form,
            [e.target.name] : e.target.value
        })
        
    )
    setForm ({  // si no hay errores que me setee el form
        ...form,
        [e.target.name]: e.target.value }) 
        }
       

      const handleCheckboxChange=(e)=> {
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="value"]');
    
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            selection.push(checkboxes[i].value);
          }
        }
        console.log(selection);
      }
    const submitHandler = (e) =>{ // aca quiero mandar una request al backend. Maneja el boton de SUBMIT
        e.preventDefault()
        setErrors(
            validate({
                ...form,
                [e.target.name] : e.target.value
            })
        )    
      if (Object.keys(errors).length === 0) {  // si el form no maneja errores, 
        console.log(form)
                // hay que despachar el formulario a algun lado
        
        alert("Gracias por confiar en nosotros");
        patientExp({                         // vuelvo a setear  los valores del formulario en string vacio, cero, etc.
          name: "",
          email: "",
          selection: []
          
        });
      } else {
        alert("ERROR! No pudimos enviar el formulario");
        return;
      }
    //   history.push("/home")
      console.log(form)
    }
    
      return (
          <div className={style.container}> 
         
          <div className={style.title}>
              <h1>CONTANOS TU EXPERIENCIA</h1>
             

        <form onSubmit={(e)=> submitHandler(e)}>
        <div className={style.inputs}>
        <input type="text" name='full_name' placeholder='Nombre Completo' autoComplete='nop' required value={form.name} onChange = {(e)=> handleInputChange(e)}  />
        {errors.name && <p>{errors.name}</p>}

        <div className={style.separador}>
        <input type="text" name='mail' placeholder='E-mail' autoComplete='nop' required  value={form.email} onChange = {(e)=> handleInputChange(e)}  />
        {errors.email && <p>{errors.email}</p>}
        </div>
        </div>
        <div className={style.question_container}>
          <label> <h1 className={style.questions}>Como calificas la atencion recibida?</h1>
           <InsertEmoticonIcon />
            <input type="checkbox" name="value" value="excelente" onChange={handleCheckboxChange} />
            Excelente
          </label>
          <label>
            <SentimentSatisfiedIcon />
            <input type="checkbox" name="value" value="buena" onChange={handleCheckboxChange} />
            Buena
          </label>
          <label>
            <SentimentVeryDissatisfiedIcon />
            <input type="checkbox" name="value" value="regular" onChange={handleCheckboxChange} />
            Regular
            
          </label>
          <label> <h1 className={style.questions}>Como calificas la atencion recibida?</h1>
            <InsertEmoticonIcon />
            <input type="checkbox" name="value" value="excelente" onChange={handleCheckboxChange} />
            Excelente
          </label>
          <label>
            <SentimentSatisfiedIcon />
            <input type="checkbox" name="value" value="buena" onChange={handleCheckboxChange} />
            Buena
          </label>
          <label>
            <SentimentVeryDissatisfiedIcon />
            <input type="checkbox" name="value" value="regular" onChange={handleCheckboxChange} />
            Regular
          </label>
          <label> <h1 className={style.questions}>Cómo te sentiste al interactuar con el personal de la clínica?</h1>
            <InsertEmoticonIcon />
            <input type="checkbox" name="value" value="excelente" onChange={handleCheckboxChange} />
            Excelente
          </label>
          <label>
            <SentimentSatisfiedIcon />
            <input type="checkbox" name="value" value="buena" onChange={handleCheckboxChange} />
            Buena
          </label>
          <label>
            <SentimentVeryDissatisfiedIcon />
            <input type="checkbox" name="value" value="regular" onChange={handleCheckboxChange} />
            Regular
          </label>
          <label> <h1 className={style.questions}>¿Cómo describirías la experiencia general en la clínica?</h1>
            <InsertEmoticonIcon />
            <input type="checkbox" name="value" value="excelente" onChange={handleCheckboxChange} />
            Excelente
          </label>
          <label>
            <SentimentSatisfiedIcon />
            <input type="checkbox" name="value" value="buena" onChange={handleCheckboxChange} />
            Buena
          </label>
          <label>
            <SentimentVeryDissatisfiedIcon />
            <input type="checkbox" name="value" value="regular" onChange={handleCheckboxChange} />
            Regular
          </label>
          <label> <h1 className={style.questions}>¿Cómo describirías el proceso de pago y facturación?</h1>
            <InsertEmoticonIcon />
            <input type="checkbox" name="value" value="excelente" onChange={handleCheckboxChange} />
            Excelente
          </label>
          <label>
            <SentimentSatisfiedIcon />
            <input type="checkbox" name="value" value="buena" onChange={handleCheckboxChange} />
            Buena
          </label>
          <label>
            <SentimentVeryDissatisfiedIcon />
            <input type="checkbox" name="value" value="regular" onChange={handleCheckboxChange} />
            Regular
          </label>
          </div>
          <button className = {style.btn} type='submit' disabled={Object.keys(errors).length > 0}>Enviar</button>
          
        </form>
        </div>
        </div>
      );
    }    