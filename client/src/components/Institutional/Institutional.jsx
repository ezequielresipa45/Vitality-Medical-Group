import React from 'react';
import style from './Institutional.module.css';
import img1 from '../../images/institucional.jpeg';
import img2 from '../../images/institucional2.jpeg'


const Institutional = ()=> {
  return (
    <div className={style.container}>
        <div className={style.divimg}>
            <img className={style.img} src={img1} alt="" />
        </div>
       
        <div className={style.first}>
      <h2 className={style.title}>¿Quiénes somos?</h2>
      <p className={style.p}>En <b>Vitality Medical Group</b>, nuestra prioridad es el bienestar general de nuestros pacientes. Como clínica de atención médica integral, nos enfocamos en proporcionar una atención integral y personalizada que aborda todos los aspectos de la salud de nuestros pacientes.
      <br/>  

      Creemos que para lograr una salud óptima, es importante considerar no solo los aspectos físicos de la salud, sino también los aspectos emocionales, psicológicos y sociales. Por eso, en Vitality Medical Group, trabajamos en estrecha colaboración con nuestros pacientes para desarrollar un plan de atención médica personalizado que aborda sus necesidades específicas y su situación individual. Desde la atención médica preventiva hasta el tratamiento de enfermedades y condiciones crónicas, nuestro equipo de médicos y especialistas está aquí para brindar la mejor atención posible a nuestros pacientes. 
      <br />

      Nos enorgullece ser una clínica que se enfoca en la prevención y el tratamiento integral de la salud, y nos esforzamos por ofrecer un servicio excepcional a nuestros pacientes en cada etapa de su atención médica. Si está buscando una clínica que se preocupa por su salud en su totalidad, lo invitamos a visitar y conocer Vitality Medical Group.</p>
        </div>
        
        <div className={style.divimg}>
            <img className={style.img} src={img2} alt="" />
        </div>
        
        <div className={style.first}>
      <h2 className={style.title}>Nuestra Misión</h2>
      <p className={style.p}>En Vitality Medical Group, nuestra misión es ofrecer una atención médica excepcional y compasiva a nuestros pacientes. Nos esforzamos por ser líderes en la atención médica a través de la innovación y la excelencia clínica.
      <br />
       Para lograr nuestra misión, nos enfocamos en los siguientes puntos clave en nuestra atención médica:
       <br />

       <b>Compasión y empatía:</b> Nos tomamos el tiempo para escuchar y comprender las necesidades de nuestros pacientes. Creemos que un enfoque compasivo y empático es fundamental para proporcionar una atención médica excepcional.
       <br />

         <b>Calidad y excelencia:</b> Nos esforzamos por ofrecer la más alta calidad en todos los aspectos de nuestra atención médica. Nos aseguramos de que nuestros pacientes reciban un tratamiento eficaz y de vanguardia por parte de un equipo de profesionales altamente capacitados.
       <br />

       <b>Personalización y atención integral:</b> Reconocemos que cada paciente es único y abordamos su atención médica de manera integral, teniendo en cuenta sus necesidades físicas, emocionales y sociales. Nos aseguramos de que nuestros pacientes reciban una atención médica personalizada que se adapte a sus necesidades individuales.
       <br /></p>

        </div>
    </div>
  );
}

export default Institutional;
