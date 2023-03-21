import React from 'react'
import styles from "./NavBar.module.css";
import logo from "../../images/logo.jpeg"

export default function NavBar() {
  return (
    <div className={styles.container__navbar}>

      <div className={styles.container__logo}>
      <img src={logo} alt="logo" />
      <p>Vitality Medical Group</p>
      </div>

<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>



    </div>
  )
}
