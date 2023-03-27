import React from "react";
import AboutCard from "./AboutCard";
import img2 from "../../images/farmacia.jpeg"
import style from "../About/AboutCard.module.css"

const AboutCards = () => {
  return (
    <div className={style.container}>
      
        <AboutCard
          fullName="Pamela Yael Herrera"
          city="CABA, Argentina"
          about="Full stack Devoloper - Front End"
          linkedin="https://www.linkedin.com/in/pamela-yael-herrera1987/"
          image={img2}
        />

        <AboutCard
            fullName="Lucas Gómez"
            city="Mendoza, Argentina"
            about="Full stack Devoloper - Back End"
            linkedin="https://www.linkedin.com/in/lucas-gomez-5773a0265/"
            image={img2}
            />

         <AboutCard
        fullName="Emanuel Marquez"
        city="Santa fe, Argentina"
        about="Full stack Devoloper - Front End"
        linkedin="https://www.linkedin.com/in/emanuel-marquez-dev/"
        image={img2}
        /> 

        <AboutCard
          fullName="Jonathan Rodriguez"
          city="Aragua, Venezuela"
          about="Full stack Devoloper - Back End"
          linkedin="https://www.linkedin.com/in/rodriguezjmm/"
          image={img2}
        />

        <AboutCard
        fullName="Ezequiel Resipa"
        city="Buenos Aires, Argentina"
        about="Full stack Devoloper - Front End"
        linkedin="https://www.linkedin.com/in/ezequiel-resipa/"
        image={img2}
          
        />
        <AboutCard
          fullName="Jonathan Berna"
          city="Lima,Peru"
          about="Full stack Devoloper - Back End"
          linkedin="https://www.linkedin.com/in/jonathan-berna-ab8112265/"
          image={img2}
        />
        <AboutCard
          fullName="Catalina Hardoy"
          city="CABA, Argentina"
          about="Full stack Devoloper - Front End"
          linkedin="https://www.linkedin.com/in/catalina-hardoy-8a3a48119/"
          image={img2}
        />
        <AboutCard
          fullName="Santiago Mendoza"
          city="Buenos Aires, Argentina"
          about="Full stack Devoloper - Back End"
          linkedin="https://www.linkedin.com/in/santiago-mendoza-722a43222/"
          image={img2}
        
        /> 
    </div>
  );
};

export default AboutCards;