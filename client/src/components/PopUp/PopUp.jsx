import React from "react";
import style from "../PopUp/PopUp.module.css"
import img from "../../images/logo.png";
import ExperienceForm from "../ExperienceForm/ExperienceForm";

function Popup(props){
    const handleOpen = props.handleOpen
    
    return (props.trigger) ? (
        <div className={style.popup}>
            <div className={style.popup_inner}>
              
                <button className={style.close_btn} onClick = {()=> props.setTrigger(false)}>X</button>
                {props.children}
              
                
            </div>

        </div>
    ): "";
    
}
export default Popup