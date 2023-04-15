import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../images/logo.png";
import AddMedicForm from "../AddMedicForm/AddMedicForm";
import DeleteDoctor from "../DeleteDoctor/DeleteDoctor";
import PutDoctor from "../PutDoctor/PutDoctor";
import GetDoctorsAdmin from "../GetDoctorsAdmin/GetDoctorsAdmin";
import UserCard from "../UserCard/UserCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../redux/actions";

export default function AdminDashboard() {
  const [titleName, setTitleName] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const handleTitleName = (e) => setTitleName(e.target.textContent);



  useEffect(() => {
    dispatch(getTickets());
  }, []);

  const handleDelete = async (data, e) => {
    e.preventDefault();

    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Enviar la solicitud POST a la API
          const response = await axios.delete("/ticketMedical/destroyTicket", {
            data: {
              idTicket: data,
            },
          });
          console.log(response.data);

          dispatch(getTickets())
        } catch (error) {
          console.error(error.message);
        }

        Swal.fire("Eliminado!", "El turno ha sido eliminado.", "Exitosamente");
      }
    });
  };

  return (
    <div className={styles.container__adminDashboard}>
      <section className={styles.container__lateral}>
        <div className={styles.perfil__container}>
          <img
            src={
              user.image
                ? user.image
                : "https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg"
            }
            alt="img-alfredo"
          />

          <div className={styles.perfil__container__data}>
            <h2>{user.full_name ? user.full_name : "John David"}</h2>

            <div className={styles.perfil__container__data__status}>
              <i
                className="fa-solid fa-earth-americas"
                style={{ color: "#399d8d" }}
              ></i>
              <p>Online</p>
            </div>
          </div>
        </div>
        <h2>General</h2>
        <div className={styles.items__container}>
          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Mi Perfil"
          >
            <i className="fas fa-user-tie" style={{ color: "#c02660" }}></i>
            <p>Mi Perfil - Administrador</p>
          </button>

          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Médicos"
          >
            <i className="far fa-user-md"></i>
            <p>Médicos</p>
          </button>

          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Agregar Médico"
          >
            <i className="fas fa-user-plus " style={{ color: "#079587" }}></i>
            <p>Agregar Médico</p>
          </button>

          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Eliminar Médico"
          >
            <i className="fas fa-user-minus" style={{ color: "#d0683c" }}></i>
            <p>Eliminar Médico</p>
          </button>

          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Editar Médico"
          >
            <i className="fas fa-user-edit" style={{ color: "#5a42a4" }}></i>
            <p>Editar Médico</p>
          </button>

          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Turnos Médicos"
          >
            <i className="fas fa-file-medical"></i>
            <p>Turnos Médicos</p>
          </button>


          <button
            onClick={handleTitleName}
            className={styles.items__container__text}
            name="Modificar Admin"
          >
            <i className="fas fa-file-medical"></i>
            <p>Modificar Admin</p>
          </button>





          <Link to="/" className={styles.items__container__text} name="Salir">
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

          <i
            className="fas fa-question-circle fa-xl"
            style={{ color: "#fff" }}
          ></i>

          <div className={styles.container__perfil}>
            <img
              src={
                user.image
                  ? user.image
                  : "https://www.grupogamma.com/wp-content/uploads/2019/09/BOSIO-ALFREDO.jpg"
              }
              alt="img-alfredo"
            />
            <h2>{user.full_name ? user.full_name : "John David"}</h2>
          </div>
        </div>

        <div className={styles.containar__master}>
          <h2>{titleName ? titleName : "Mi Perfil - Administrador"}</h2>

          {titleName === "Agregar Médico" && <AddMedicForm />}
          {titleName === "Eliminar Médico" && <DeleteDoctor />}
          {titleName === "Editar Médico" && <PutDoctor />}
          {titleName === "Médicos" && <GetDoctorsAdmin />}
          {titleName === "Modificar Admin" && <UserCard />}
          {(titleName === "Mi Perfil - Administrador" || titleName === "") && (
            <div className={styles.container__profile}>
              <header>
                <div className={styles.container__texto}>
                  <p>
                    {" "}
                    <span>Nombre:</span>{" "}
                    {user.full_name ? user.full_name : "John David"}
                  </p>
                  <p>
                    <span>Departamento:</span> Administrador
                  </p>
                  <p>
                    <span>Correo electronico:</span>{" "}
                    {user.email ? user.email : "jDavid@gmail.com"}
                  </p>
                  <p>
                    <span>Teléfono:</span> 11-38519846
                  </p>
                  <p>
                    <span>Título:</span> Creative Assistant Manager
                  </p>
                </div>
              </header>
            </div>
          )}

          {titleName === "Turnos Médicos" && (
            <div className={styles.container__turnos}>
              {console.log(tickets)}

              {tickets &&
                tickets.map((ticket) => {
                  if (ticket.doctor !== null) {
                    return (
                      <div>
                        <div className={styles.card}>
                          <img
                            className={styles.avatar}
                            src={ticket.doctor.image}
                            alt={ticket.doctor.full_name}
                          />

                          <label className={styles.info}>
                            <span className={styles.info_1}>
                              {ticket.doctor.full_name}
                            </span>
                            <span className={styles.info_2}>
                              <p>{ticket.day.day} </p>
                              <p>{ticket.date}</p>
                              <p> {ticket.hour}</p>
                            </span>
                          </label>
                          <div className={styles.content_1}>
                            <p>{ticket.observations.toUpperCase()}</p>
                          </div>
                          <div className={styles.content_2}>
                            <p>Paciente: {ticket.patient.full_name}</p>
                          </div>
                          <form onSubmit={(e) => handleDelete(ticket.id, e)}>
                            <button
                              type="submit"
                              style={{
                                color: "white",
                                padding: ".2rem",
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                            >
                              <i
                                className="fas fa-trash"
                                style={{ color: "white", paddingTop: ".4rem" }}
                              ></i>
                            </button>
                          </form>
                        </div>
                        <br />
                      </div>
                    );
                  }
                })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
