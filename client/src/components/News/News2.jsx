import React from 'react';
import { Link } from 'react-router-dom';

import styles from './News2.module.css';


export default function News(props) {

    return (

        <div className={styles.new_container}>

            <img src={props.image} alt='news image'/>

            <div className={styles.date_div}>{props.date}</div>

            <div className={styles.item}>

                <h3>{props.title}</h3>

                <p>{props.description}</p>

                {/* <button>
                    <Link to={props.url}>Read more</Link>
                </button> */}

            </div>
        
        </div>

    )
}
