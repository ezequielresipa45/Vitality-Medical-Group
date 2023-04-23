import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

export default function SearchResults(props) {

    const navigate = useNavigate();

    const onClick = (value) => {
        props.type === 'Médico' 
            ? navigate(`/especialidad/${value}`)
            : navigate(`/analisis`);
      };
    
    return (
       
            <div className={styles.results_item} onClick={() => {onClick(props.speciality)}}>
                <h4>{props.title}</h4>
                <h5>{props.type}</h5>
                <p>{props.speciality}</p>
                
            </div>
        
    );
};
