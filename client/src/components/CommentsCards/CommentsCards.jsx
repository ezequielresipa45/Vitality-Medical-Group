import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../redux/actions';
import {useEffect} from "react";
import style from "../CommentsCards/CommentsCards.module.css"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


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



export default function CommentsCard() {

  const comment = useSelector ((state)=> state.comment)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getComments());
  }, [dispatch])
// console.log(comment)


    
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
    <Box className={style.container} sx={{ maxWidth:300 }} >
      <Paper 

        square
        elevation={0}
        variant= "rounded"
        sx={{
          display: 'contents',
          alignItems: 'center',
          height: 50,
          pl: 2,
          width: 300,
          marginRight: 90
          
        }}
      > Nuestros pacientes: <br />
        
      </Paper>
      <Box sx={{ height: 80, maxWidth: 400, width: '100%', p: 2 }}>{customIcons[comment[activeStep]?.rating]?.icon} <br /> 
        "{comment[activeStep]?.comment}"
      </Box>
      <MobileStepper  className={style.btn}
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
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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