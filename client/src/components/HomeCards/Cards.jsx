import React from "react";
import Card from "./Card";
import style from './Cards.module.css';
import img1 from '../../images/medicoCard.jpg';
import img2 from '../../images/farmacia.jpeg';
import img3 from '../../images/pastillasAco.jpg';

const Cards = () => {
  return (
    <div className={style.dad}>
      <h3>Beneficios</h3>
      <div className={style.container}>
        <Card
          title="Descuentos en Farmacia"
          description="Obtén descuentos en medicamentos y otros productos en farmacias cercanas a tu ubicación."
          image={img2}
        />
            <Card
              title="Anticonceptivos Gratuitos"
              description="Obtén acceso a anticonceptivos gratuitos y confiables en tu centro de salud más cercano."
              image={img3}
            />
          <Card
            title="Calidad Médica y Calidez Humana"
            description="Recibe atención médica de calidad y un trato humano y amable por parte de nuestros profesionales de la salud."
            image={img1}
          />
      </div>
    </div>
  );
};

export default Cards;
