import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../redux/actions';
import {useEffect} from "react";
import style from "../CommentsCards/CommentsCards.module.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize='large'  />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error"  fontSize='large' />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning"  fontSize='large' />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize='large'  />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize='large'/>,
    label: 'Very Satisfied',
  },
};

export default function CommentsCard() {

  const comment = useSelector ((state)=> state.comment.slice(0,5));
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getComments());
  }, [dispatch])

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = comment.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={style.container}  sx={{height: 300, maxWidth:800, marginLeft: "300px", marginTop: "80px", border: "1px solid black",
    padding: "10px",
  }} >
      <Paper 

        square
        elevation={4}
        variant= "rounded"
        sx={{
          display: 'contents',
          alignItems: 'center',
          width: 400,
          fontSize: "25px"
        }}
      > Nuestros pacientes: <br />
        
      </Paper>
      <Box sx={{ height: 80, maxWidth: 800, width: '100%', p: 2, marginTop:"50px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{marginLeft: "-25px"}}> {customIcons[comment[activeStep]?.rating]?.icon} </Box>
       <Box>"{comment[activeStep]?.comment}"</Box>
      </Box>
      <MobileStepper sx={{ marginTop: "50px" }}  className={style.btn}
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button 
          
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
           
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button   size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            
          </Button>
          
        }
       
      />
   
    </Box>
  );
}