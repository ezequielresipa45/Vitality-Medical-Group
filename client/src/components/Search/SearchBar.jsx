import React from 'react';
import styles from './Search.module.css';

export default function SearchBar(props) {
    
    
    return (
        
        <div className={styles.search_div}>
            <input className={styles.search_input} placeholder='Busqueda de coincidencias' value={props.search} onChange={props.handleChange}/>
            <button>
                <i className='fa-solid fa-magnifying-glass'></i>
            </button>
        </div>
    
    );
};
