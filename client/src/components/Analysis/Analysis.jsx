import React from 'react';
import styles from './Analysis.module.css'

const ANALYSIS_IMAGE = 'https://images.pexels.com/photos/4226902/pexels-photo-4226902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const TRAUMA_IMAGE = 'https://images.pexels.com/photos/4226258/pexels-photo-4226258.jpeg';
const CARDIO_IMAGE = 'https://cdn.pixabay.com/photo/2019/06/18/01/06/ecg-4281208_1280.jpg';
const NEURO_IMAGE = 'https://cdn.pixabay.com/photo/2021/12/02/22/15/x-ray-6841384_1280.jpg';
const PSIQUIA_IMAGE = 'https://cdn.pixabay.com/photo/2020/03/23/17/04/brain-4961452_1280.jpg';




export default function Analysis(props) {

    let default_image = ANALYSIS_IMAGE;

    if (props.speciality === 'Cardiología') default_image = CARDIO_IMAGE;
    if (props.speciality === 'Traumatología') default_image = TRAUMA_IMAGE;
    if (props.speciality === 'Neurología') default_image = NEURO_IMAGE;
    if (props.speciality === 'Psiquiatría') default_image = PSIQUIA_IMAGE;

    return (
    
        <div className={styles.item}>

            <img src={props.image ? props.image : default_image } alt='analysis image' />

            <div>
                <p>{props.speciality}</p>
            </div>

            <h4>{props.title}</h4>

            <p>{props.description}</p>

            <p>{props.price}</p>

        </div>

    )
};
