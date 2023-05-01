import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import style from "../ExperienceForm/ExperienceForm.module.css";
import {postComment} from "../../redux/actions";
import Swal from "sweetalert2";


function validate(experienceForm){
    let error = {};
    
    if(!experienceForm.comment){
        error.comment = "Deja tu comentario!"
    }if(!experienceForm.rating){
      error.rating = "Deja tu puntuación!"
    }
   return error 
}

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
const labels = {
   
    1: "Mala",
    2: 'Regular',
    3: 'Buena',
    4: 'Muy Buena',
    5: 'Excelente',
  };
  
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
export default function ExperienceForm() {

    const dispatch = useDispatch()

const user = useSelector(state=>state.user.id) // me traigo del esto global el user.id

const [showForm, setShowForm] = useState(true)

 
const [experienceForm, setExperienceForm] = useState({

    rating : 0,
    comment : "",
    userId: user
    
})

const [errors, setErrors] = useState({  // este es el estado de errores
    rating: 0,
   comment: ""
})     


useEffect(() => {
  setErrors(validate(experienceForm));
}, [experienceForm]);

const [value, setValue] = useState(2);
const [hover, setHover] = useState(-1);

const handleInputChange = (e) =>{
    setErrors(                  // primero le paso los errores para que primer vea si hay error y frene antes.
    validate({
        ...experienceForm,
        [e.target.name] : e.target.value
    }) 
)
setExperienceForm ({  // si no hay errores que me setee el form
    ...experienceForm,
    [e.target.name]: e.target.value }) 
}
   
const submitHandler = (e) =>{ // aca quiero mandar una request al backend. Maneja el boton de SUBMIT
    e.preventDefault()
    setErrors(
        validate({
            ...experienceForm,
            [e.target.name] : e.target.value
        })
    )
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    if (Object.keys(errors).length === 0) {  // si el form no maneja errores, 
      const data = {
        rating: experienceForm.rating,
        comment: experienceForm.comment,
        userId: user,
        
      };  
      // console.log(data)
      
      // console.log(experienceForm)
                // hay que despachar el formulario a algun lado
        dispatch(postComment(data))

        console.log(postComment(data))
        Toast.fire({
          icon: "success",
          title: "Gracias por elegirnos",
        });;
        
        setExperienceForm({                         // vuelvo a setear  los valores del formulario en string vacio, cero, etc.
         rating : 0,
         comment: "", 
        });
        setShowForm(false);
      } else {
        alert("ERROR! No pudimos enviar el formulario");
        return;
      }
    
      console.log(experienceForm)
    }    


  return (
    
    <div className={style.container}>
        
        <p> Con tu opinión nos ayudas a mejorar.</p>
        <h3 className = {style.text}>Como clasificarías tu experiencia con nosotros?</h3>
       
    <form onSubmit={(e)=> submitHandler(e)}>    
    <br />
    <StyledRating
      name="rating"
      value={experienceForm.rating}
      IconContainerComponent={IconContainer}
      getLabelText={getLabelText}
      highlightSelectedOnly
      className={style.face_area}
      onChange = {(event, newValue) => {
        setExperienceForm({
          ...experienceForm,
          rating: newValue
        })
        setValue(newValue);
      }}
    
      onChangeActive= {(event, newHover) => {setHover(newHover);
    }}
    
    />
   
    {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    
        
        <div>
          <textarea className={style.text_area} 
          type="text" name= "comment" autoComplete= "nop" 
          placeholder= "Comentarios..." onChange={(e)=> handleInputChange(e)}
          value={experienceForm.comment} />

         
         
        </div>
        <button type='submit'>ENVIAR</button>

        </form>  
    </div>
  );
}
