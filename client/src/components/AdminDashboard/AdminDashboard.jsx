import React, { useState } from 'react';
import styles from "./AdminDashboard.module.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from "../../images/logo.png";


export default function AdminDashboard() {
    return (
        <div className={styles.container__adminDashboard}>


            <section className={styles.container__lateral}>
                <div className={styles.perfil__container} >
                    <img src="https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg" alt="img-alfredo" />

                    <div className={styles.perfil__container__data}>
                        <h2>John David</h2>

                        <div className={styles.perfil__container__data__status}>

                            <i class="fa-solid fa-earth-americas" style={{ color: "#399d8d" }}></i>
                            <p>Online</p>

                        </div>


                    </div>
                </div>
                <h2>General</h2>
                <div className={styles.items__container}>

                    <div className={styles.items__container__text}>
                    <i class="fas fa-user-tie" style= {{color: "#c02660"}}></i>    
                    <p>Mi Perfil</p>
                    </div>


                    <div className={styles.items__container__text}>
                    <i class="fas fa-user-plus " style= {{color: "#079587"}}></i>    
                    <p>Agregar Médico</p>
                    </div>


                    <div className={styles.items__container__text}>
                    <i class="fas fa-user-minus" style= {{color: "#d0683c"}}></i>    
                    <p>Eliminar Médico</p>
                    </div>


                    <div className={styles.items__container__text}>
                    <i class="fas fa-user-edit" style= {{color: "#5a42a4"}}></i>    
                    <p>Editar Médico</p>
                    </div>


                    <div className={styles.items__container__text}>
                    <i class="fas fa-sign-out" style= {{color: "#ea9c2c"}}></i>    
                    <p>Salir</p>
                    </div>



                </div>



            </section>
            <section className={styles.container__principal}>


                <div className={styles.container__navbar}>

        <div className={styles.container__logo}>
         
            <img src={logo} alt="logo" />
            <p>Vitality Medical Group</p>
        
        </div>

        <div className={styles.container__perfil}>
        <img src="https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg" alt="img-alfredo" />
        <h2>John David</h2>

        </div>



                </div>
            </section>












        </div>
    )
}
