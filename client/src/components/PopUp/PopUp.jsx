import React from "react";
import style from "../PopUp/PopUp.module.css"


function Popup(props){
    const handleOpen = props.handleOpen
  
    const handleOnClose = () => {
        props.setTrigger(false);
      };
    
    return (props.trigger) ? (
        <div className={style.popup}>
            <div className={style.popup_inner}>
              
                <button className={style.close_btn} onClick = {handleOnClose}>X</button>
                {props.children}
              
                
            </div>
  
        </div>
    ): "";
    
  }
  export default Popup