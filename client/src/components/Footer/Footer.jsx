import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Link} from "react-router-dom"
import style from "../Footer/Footer.module.css";



const Footer = ()=>{

    return (
        <div className={style.footer}>
        <Grid container direction = "row" justifyContent="space-between" alignItems="flex-start">
  <Grid item xs={6} alignItems = "flex-start" >
   
      
        
        <h4>SOBRE NOSOTROS </h4> 
           <Link className={style.link} to = "/institucional">Institucional</Link>
           <a className={style.link} href="mailto:infovitalitymedical@gmail.com">Contactanos</a>
           <Link className={style.link} to = "/conocenos">Conocenos</Link>
       
       
        </Grid>
  <Grid item xs={6}>
      
   
        <ul>
        <h4>SEGUINOS</h4>
        <Link className={style.link} to = "https://www.facebook.com/profile.php?id=100091161765205"> <FacebookIcon fontSize="medium"/></Link>
        <Link className={style.link} to = "https://www.instagram.com/vitalitymedicalgroup"> <InstagramIcon fontSize="medium"/></Link>
        <Link className={style.link} to = "https://twitter.com/group_medi78854"> <TwitterIcon fontSize="medium"/></Link>

        </ul>
        
        
  </Grid>
  <Grid className={style.subFooter} item xs={12}>
   <span>©Vitality Medical Group 2020 - Todos los derechos reservados -</span>
  </Grid>
</Grid>
</div>
    )
}

export default Footer


// SOBRE NOSOTROS -->INSTITUCIONAL --> onclick al institucional
 //                 --> Conocenos --> link a una pagina con nuestros nombres y perfiles(puede ser lindo)
//                --> Contacto --> link para enviar mail a vitalitymedicalg@gmail.com
 //SEGUINOS -> FB/twitter/IG --> onclick al fb

 


