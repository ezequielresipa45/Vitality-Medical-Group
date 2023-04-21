import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './JitsiMeet.module.css';
import { useSelector, useDispatch } from "react-redux"
import { useEffect,  } from "react"
import { getPatients } from "../../redux/actions"

const JitsiMeet = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const patients = useSelector(state => state.patients)
  const [hasPatients, setHasPatients] = useState(false)

  useEffect( () => {
    dispatch(getPatients())
  }, [])

  useEffect( () => {
    setHasPatients(patients.filter( p => p?.userId === user?.id).length >= 1)
    console.log(patients.filter( p => p.userId === user.id).length >= 1)
  }, [patients])
    return(
        <div className={style.background}>
          <h1 className={style.title}>Médico Online</h1>
          <div className={style.paragraph}>
            <blockquote>
              <p>
                El servicio de médico online permite a los pacientes consultar con un profesional de la salud de forma remota durante las 24 hs, a través de internet. En lugar de visitar una clínica o un hospital físico, los pacientes pueden conectarse con un médico en línea utilizando una computadora, un teléfono inteligente o una tableta.
              </p>
            </blockquote>
            <blockquote>
              <p>
                Ventajas de nuestro servicio, incluyendo la comodidad y la accesibilidad.             Los pacientes pueden acceder a un médico en línea desde cualquier lugar, lo que significa que no tienen que preocuparse por viajar o hacer largas esperas en la clínica. Además, muchos servicios de atención médica en línea están disponibles las 24 horas del día, los 7 días de la semana, lo que significa que los pacientes pueden recibir atención médica en cualquier momento que lo necesiten.
              </p>
            </blockquote>
            <blockquote>
              <p>
                ¡ACLARACIÓN! Es importante tener en cuenta que los servicios de atención médica en línea no son adecuados para todas las situaciones médicas. Algunas condiciones pueden requerir una evaluación física o pruebas de diagnóstico, lo que significa que es posible que los pacientes deban visitar un médico en persona para recibir   un diagnóstico o un tratamiento adecuado.
              </p>
            </blockquote>
          </div>
        <div>
          <Link to="https://meet.jit.si/DarkJamsHurryPartially" target="_blank"
                  style={{pointerEvents: hasPatients ? "auto" : "none"}}>
            <button className= {style.meetbutton}>
              Ir al consultorio virtual
            </button>
          </Link>
          {!hasPatients && <div>
              <p>Tienes que ser o tener un paciente registrado</p>
              <p>para poder ingresar</p>
            </div>
          }
        </div>
        </div>
    );
};
export default JitsiMeet;