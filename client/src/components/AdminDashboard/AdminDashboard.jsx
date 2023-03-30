import React, { useState } from 'react';
import styles from "./AdminDashboard.module.css";
import Swal from 'sweetalert2';
import axios from 'axios';

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



            </section>
            <section className={styles.container__principal}>
                <p>Soy Principal</p>
            </section>












        </div>
    )
}
