import React from 'react';

import styles from './Search.module.css';

export default function SearchResults(props) {
    
    return (
       
            <div className={styles.results_item}>
                <h4>{props.title}</h4>
                <h5>{props.type}</h5>
                <p>{props.speciality}</p>
                
            </div>
        
    );
};
