import React from "react";
import style from "../PopUp/PopUp.module.css"
import img from "../../images/logo.png";

function Popup(props){
    return (props.trigger) ? (
        <div className={style.popup}>
            <div className={style.popup_inner}>
                <img src={img} alt="" />
                <button className={style.close_btn} onClick = {()=> props.setTrigger(false)}>X</button>
                {props.children}

            </div>

        </div>
    ): "";
    
}
export default Popup