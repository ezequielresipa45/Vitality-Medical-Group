import style from "../PatientDashboard/PatientDashboard.module.css"
import * as React from 'react';
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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from "@mui/material/Button"
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import CakeIcon from '@mui/icons-material/Cake';
import FeedIcon from '@mui/icons-material/Feed';
import Avatar from '@mui/material/Avatar';
import img from "../../images/logo.png"
import ExperienceForm from "../ExperienceForm/ExperienceForm";
import Popup from "../PopUp/PopUp";
import Input from '@mui/material/Input';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {useState} from 'react'
// import {Link} from 'react-router-dom'


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
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [buttonPopup, setButtonPopup] = useState(false) 

  // function AvatarWithUpload() {
  //   const [imageUrl, setImageUrl] = useState('');
  
  //   const handleImageUpload = (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       setImageUrl(reader.result);
  //     }
  
  //     reader.readAsDataURL(file);
  //   };
  // }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
          className={style.toolbar}
          
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
             
            >
              <img src={img} alt="" className={style.img_logo}/>      
                   Vitality Medical Group

            </Typography>
            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
             
              <p className={style.name_patient}> NAME PATIENT</p>
             
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" className={style.text}>
            
            <Divider sx={{ my: 1 }} />
            <Button size ="large" color = "primary" className={style.text} > <LocalHospitalSharpIcon fontSize = "large" className={style.text}/> TU PLAN</Button>
            <br /><br />
            <Button className={style.text}> <CalendarMonthIcon fontSize = "large"  className={style.text}/> TUS TURNOS</Button>
            <br /><br />
            <Button className={style.text}> <HistorySharpIcon fontSize = "large"  className={style.text}/> TU HISTORIAL</Button>
            <br /><br />
            <Link href ='/cartilla' underline="none">
            <Button> 
              <MenuBookIcon fontSize = "large"  className={style.text}/> 
              TU CARTILLA
              </Button>
              </Link>
            <br /><br />
            <Button onClick={()=>setButtonPopup(true)}className={style.text} ><FeedIcon fontSize= "large" className={style.text}/>TU EXPERIENCIA </Button>
                <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>   
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
            <Grid container spacing={3}>
              {/* Chart */}
              
              <Grid item xs={4} >

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 450,
                  }}
                  elevation={24}
                >
                  <Avatar sx={{ width: 150, height: 150}} ></Avatar>
                  {/* <Input type="file" onChange={handleImageUpload}></Input> falta agregar src al avatar */ }
                  <Typography variant="body2" sx={{justifyContent: 'flex-start', display: 'flex', alignItems: 'center', fontSize:25}}> FULL NAME</Typography>
            

                 <Divider variant="middle" flexItem></Divider> 
                 <br /><br /><br />
                 <Typography><CakeIcon fontSize = "large"/></Typography>
                </Paper>
              </Grid>
            
              <Grid item xs={6} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 450,
                  }}
                  elevation={24}

                >
               
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                 
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function PatientDashboard() {
  return <DashboardContent />;
}
