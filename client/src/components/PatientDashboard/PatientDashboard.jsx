import * as React from 'react';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {getPatients, getDoctors} from "../../redux/actions"

import FrequentDoctors from '../FrequentDoctors/FrequentDoctors';
import PatientTickets from '../PatientTickets/PatientTickets';
import TicketsAnalysis from '../TicketsAnalysis/TicketsAnalysis';
import ExperienceForm from "../ExperienceForm/ExperienceForm";
import Popup from "../PopUp/PopUp";

import style from "../PatientDashboard/PatientDashboard.module.css"
import img from "../../images/logo.png"

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Diversity3Icon from "@mui/icons-material/Diversity3"
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Avatar from '@mui/material/Avatar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
     
      boxSizing: 'border-box',
        overflowX: 'hidden',
        ...(!open && {
          width: theme.spacing(9),
        
      }),
    },
  }),
);


function DashboardContent() {
  
  const user = useSelector((state)=>state.user);
  const patients = useSelector((state)=>state.patients);
 
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [buttonPopup, setButtonPopup] = useState(false) 
  const [patientsName, setPatientsName] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [frequentDoctors, setFrequentDoctors] = useState([])


  useEffect(()=>{
    dispatch(getPatients());
  }, []);

  const patientsByLogin = patients.filter((p)=>p.userId === user.id)

  const initials = user.full_name?.split(" ")
    .map((name) => name.charAt(0))
    .join("");
    
    const countDoctors = (tickets) => {
      const doctorCounts = {};
      tickets.forEach((ticket) => {
        if (!doctorCounts[ticket.doctorId]) {
          doctorCounts[ticket.doctorId] = 1;
        } else {
          doctorCounts[ticket.doctorId]++;
        }
      });
      return doctorCounts;
      
    };

    const openPopup = () => {
      setButtonPopup(true)
    }

    useEffect(()=> {
      if (selectedPatient) {
        const doctors = countDoctors(selectedPatient.ticketMedicals);
        setFrequentDoctors(doctors);
      }
    }, [selectedPatient])

    const handlePatientClick = (patient) => {
      setPatientsName(patient.full_name);
      setSelectedPatient(patient);
      const doctors = countDoctors(patient.ticketMedicals);
      setFrequentDoctors(doctors)
    };


  return (
    // <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} onClick = {()=> navigate("/")} >
            <Toolbar
          className={style.toolbar}
            sx={{
              pr: '24px',
              flexDirection:"row",
              alignItems:"center"
            }}
            >  
        <Typography
              component="div"
              variant="h6"
              color="inherit"
              sx={{ flexGrow: 1 }}
            >
            <img src={img} alt="" className={style.img_logo}/> Vitality Medical Group      
              
        </Typography>
            
        </Toolbar>
       </AppBar>

       <Drawer variant="permanent" open={open} sx={{width: 240}} >
            
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              width: 240,
              height: 63
            }}
          >
            {/* <Avatar sx={{ width: 56, height: 56, position: "absolute", left: 90}} > {initials}</Avatar>
             */}
             <Avatar sx={{ width: 56, height: 56, position: "absolute", left: 90}} > 
                {user.image ? (
              <img src={user.image} alt={user.full_name} />
              ) : (
            initials
                    )}

            </Avatar>
               
        </Toolbar>
            
            <Divider />
        
              <List component="nav" >
         
            {patientsByLogin.map((patient) => (
            <ListItemButton key={patient.id} onClick={() => handlePatientClick(patient)}>
            <ListItemText sx={{fontFamily: "FireSans", display: "flex", alignItems: "center", fontSize: 15}} ><PersonIcon color="primary" fontSize="large"/><p className={style.name_patient}>{patient.full_name}</p></ListItemText>
            </ListItemButton>
             ))}

            <ListItemButton><Link href ='/cartilla' underline="none">
            <ListItemText><MenuBookIcon fontSize = "large"  className={style.text}/><p className={style.name_patient}>Tu cartilla</p> </ListItemText>
            </Link></ListItemButton>
       
            <ListItemButton onClick={openPopup}>
           
            <ListItemText><Diversity3Icon color="primary" fontSize = "large"  className={style.text}/><p className={style.name_patient}> Tu experiencia</p> </ListItemText>
       
            </ListItemButton>
                <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}> 
                <IconButton className={style.close_button} onClick={() => setButtonPopup(false)}></IconButton>  
                   <ExperienceForm/>
               </Popup>
           </List>
         
        </Drawer>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={10} justifyContent = "center" alignItems="center" style = {{height : "450px"}}>
              
            <Grid item xs={12} sm={6} >
            
              
    <Paper elevation ={24} sx={{ p: 2 }} style = {{height : "477px"}} >
      {/* <PersonIcon sx={{ fontSize: '70px' }}color="primary"/> */}
      
      <Avatar sx={{ width: 100, height: 100, justifyContent: "center", alignItems:"center",  display: 'flex', margin: "auto"}} >{user.image ? (
<img src={user.image} alt={user.full_name} />
) : (
initials
)}</Avatar>

    {!selectedPatient ? (
          <div>
            <h2>{user.full_name}</h2>
            <h3>{user.email}</h3>
          </div>) : (
          <>
          <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <Avatar sx={{ width: 100, height: 100}}></Avatar> */}
          </Grid>
            <div style = {{textAlign: "center"}}>    
            
              <>
            <h2 className = {style.font}>{selectedPatient.full_name}</h2>
            <p className = {style.font}>{`Edad: ${selectedPatient.age} años`}</p>
            <p className = {style.font}>{`Cumpleaños: ${selectedPatient.birthday}`}</p>
            <p className = {style.font}>{`Direccion: ${selectedPatient.address}`}</p>
            <p className = {style.font}>{`Teléfono: ${selectedPatient.phone}`}</p>
            <br />
            <Link href={`/putpatient/${selectedPatient.id}`} underline="none" >Actualizar Perfil</Link>
            </>
            </div>   
          </>
        )}
      
    </Paper>
</Grid>
 
<Grid item xs={12} md={6}>
    <Paper elevation={24} sx={{ p: 2 , height : 477, textAlign: "center"}}>
          <CalendarMonthIcon sx={{ fontSize: '70px' }} color = "primary"/>
        {selectedPatient && (
          <>
      <Typography>
      <PatientTickets patient ={selectedPatient}/>
      </Typography>
      </>
      )}
    
    </Paper>
</Grid>

<Grid item xs={12} md={6}>
    <Paper elevation={24} sx={{ p: 2 , height : 447, textAlign: "center"}}>
        <CalendarMonthIcon sx={{ fontSize: '70px' }} color = "primary"/>
        {selectedPatient && (
          <>
    <Typography>
    <TicketsAnalysis patient ={selectedPatient}/>
    </Typography>
      </>
      )}
    
    </Paper>
</Grid>
<Grid item xs={12} md={6}>
    <Paper elevation={24} sx={{ p: 2 , height : 447, textAlign: "center"}}>
          <RecentActorsIcon  sx={{ fontSize: '80px' }} color = "primary"/>
              {selectedPatient && (
         <>
      <Typography>
          <FrequentDoctors patient = {selectedPatient}/>
      </Typography>

         </>
       )}
    
    </Paper>
</Grid>
      
        </Grid>
      </Container>
    </Box>
</Box>
    // </ThemeProvider>
  );
}

export default function PatientDashboard() {
  return <DashboardContent />;
}
