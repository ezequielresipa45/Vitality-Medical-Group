import React from 'react';
import styles from './Analysis.module.css'


export default function Analysis(props) {

    return (
    
        <div className={styles.item}>

            <h4>{props.title}</h4>

            <p>{props.speciality}</p>

            <p>{props.description}</p>

        </div>

    )
};
