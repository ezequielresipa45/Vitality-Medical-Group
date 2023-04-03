import React from 'react';

import logo_abbott from '../../images/logos/abbott.png';
import logo_bayer from '../../images/logos/bayer.png';
import logo_gsk from '../../images/logos/gsk.png';
import logo_johnson from '../../images/logos/johnson.png';
import logo_merck from '../../images/logos/merck.png';
import logo_novartis from '../../images/logos/novartis.png';
import logo_pg from '../../images/logos/p&g.png';
import logo_pfizer from '../../images/logos/pfizer.png';
import logo_roche from '../../images/logos/roche.png';
import logo_sanofi from '../../images/logos/sanofi.png';

import styles from './Sponsors.module.css';


export default function Sponsors() {

    return (
        
        <div className={styles.container}>

            <h2>Empresas que confian en nuestra institución:</h2>

            <div className={styles.slider}>

                <div className={styles.gradient1}></div>

                <div className={styles.slide_track}>

                    <div className={styles.slide}>
                        <img src={logo_abbott} height={'50px'} width={'150px'} alt='logo' />
                    </div>

                    <div className={styles.slide}>
                        <img src={logo_bayer} height={'50px'} width={'50px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_gsk} height={'80px'} width={'100px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_pfizer} height={'50px'} width={'100px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_merck} height={'50px'} width={'150px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_roche} height={'50px'} width={'100px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_novartis} height={'50px'} width={'150px'} alt='logo' />
                    </div>

                    <div className={styles.slide}>
                        <img src={logo_sanofi} height={'50px'} width={'100px'} alt='logo' />
                    </div>
            
                    <div className={styles.slide}>
                        <img src={logo_johnson} height={'50px'} width={'150px'} alt='logo' />
                    </div>
                    
                    <div className={styles.slide}>
                        <img src={logo_pg} height={'50px'} width={'100px'} alt='logo' />
                    </div>
                        
                </div>
                
                <div className={styles.gradient2}></div>

            </div>
        </div>
    );
};
