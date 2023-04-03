import React, { useState } from 'react';
import styles from "./AdminDashboard.module.css";
import Swal from 'sweetalert2';
import axios from 'axios';
import logo from "../../images/logo.png";
import AddMedicForm from "../AddMedicForm/AddMedicForm";
import DeleteDoctor from "../DeleteDoctor/DeleteDoctor";
import PutDoctor from "../PutDoctor/PutDoctor";
import GetDoctorsAdmin from "../GetDoctorsAdmin/GetDoctorsAdmin";
import { Link } from 'react-router-dom';



export default function AdminDashboard() {


    const [titleName, setTitleName] = useState("");


    const handleTitleName = (e) => setTitleName(e.target.textContent);


    return (
        <div className={styles.container__adminDashboard}>


            <section className={styles.container__lateral}>
                <div className={styles.perfil__container} >
                    <img src="https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg" alt="img-alfredo" />

                    <div className={styles.perfil__container__data}>
                        <h2>John David</h2>

                        <div className={styles.perfil__container__data__status}>

                            <i className="fa-solid fa-earth-americas" style={{ color: "#399d8d" }}></i>
                            <p>Online</p>

                        </div>


                    </div>
                </div>
                <h2>General</h2>
                <div className={styles.items__container}>

                    <button onClick={handleTitleName} className={styles.items__container__text} name="Mi Perfil" >
                        <i className="fas fa-user-tie" style={{ color: "#c02660" }}></i>
                        <p>Mi Perfil - Administrador</p>
                    </button>

                    <button onClick={handleTitleName} className={styles.items__container__text} name="Médicos" >
                        <i className="fas fa-user-plus " style={{ color: "#079587" }}></i>
                        <p>Médicos</p>
                    </button>


                    <button onClick={handleTitleName} className={styles.items__container__text} name="Agregar Médico" >
                        <i className="fas fa-user-plus " style={{ color: "#079587" }}></i>
                        <p>Agregar Médico</p>
                    </button>


                    <button onClick={handleTitleName} className={styles.items__container__text} name="Eliminar Médico" >
                        <i className="fas fa-user-minus" style={{ color: "#d0683c" }}></i>
                        <p>Eliminar Médico</p>
                    </button>


                    <button onClick={handleTitleName} className={styles.items__container__text} name="Editar Médico" >
                        <i className="fas fa-user-edit" style={{ color: "#5a42a4" }}></i>
                        <p>Editar Médico</p>
                    </button>

                    <Link to='/' className={styles.items__container__text} name="Salir" >
                        <i className="fas fa-sign-out" style={{ color: "#ea9c2c" }}></i>
                        <p>Salir</p>
                    </Link>



                </div>



            </section>
            <section className={styles.container__principal}>


                <div className={styles.container__navbar}>

                    <div className={styles.container__logo}>

                        <img src={logo} alt="logo" />
                        <p>Vitality Medical Group</p>

                    </div>

                    <i className="fas fa-question-circle fa-xl" style={{ color: "#fff" }}></i>

                    <div className={styles.container__perfil}>
                        <img src="https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg" alt="img-alfredo" />
                        <h2>John David</h2>

                    </div>



                </div>


                <div className={styles.containar__master}>

                    <h2>{titleName ? titleName : "Mi Perfil - Administrador"}</h2>

                    {titleName === "Agregar Médico" && (<AddMedicForm />)}
                    {titleName === "Eliminar Médico" && (<DeleteDoctor />)}
                    {titleName === "Editar Médico" && (<PutDoctor />)}
                    {titleName === "Médicos" && (<GetDoctorsAdmin />)}
                    {(titleName === "Mi Perfil - Administrador" || titleName === "" ) &&
                        (
                            <div className={styles.container__profile}>


                                <header>
                                    <img src="https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg" alt="img-alfredo" />
                                    <div className={styles.container__texto}>

                                        <p> <span>Nombre:</span>  John David</p>
                                        <p><span>Edad:</span>  35 años</p>
                                        <p><span>Departamento:</span>  Departamento: Administrador</p>
                                        <p><span>Correo electronico:</span>  jDavid@gmail.com</p>
                                        <p><span>Teléfono:</span>  11-38519846</p>
                                        <p><span>Título:</span>  Crative Assistant Manager</p>

                                    </div>


                                </header>



                            </div>
                        )}












                </div>
            </section>
        </div>
    )
}
