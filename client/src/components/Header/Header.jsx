import React from 'react'
import NavBar from '../NavBar/NavBar';
import styles from "./Header.module.css";
import Footer from '../Footer/Footer';

export default function Header() {
  return (
    <div className={styles.container__header}>

     <NavBar/> 
     <Footer/>  



    </div>
  )
}
