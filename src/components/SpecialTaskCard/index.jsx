import React from "react";

import SpecialTaskIcon from "../../assets/special_task.png"
import AvailableIcon from "../../assets/available.png"
import DoneIcon from '../../assets/done.png'
import CoinIcon from '../../assets/coin.png'

import "./index.css"

const SpecialTaskCard = ({title, id, bonus, status, visit}) =>{

    const handleClick = () =>{
        if(status === 1) return;
        visit(id);
    }

    return (
        <div className="special-task-card" onClick={handleClick}>
            <img src={SpecialTaskIcon} alt="" />
            <div>
                <h3>{title}</h3>
                <div>
                    <img src={CoinIcon} alt="" />
                    <span>{bonus}</span>
                </div>
            </div>
            <img src={status === 0?AvailableIcon:DoneIcon} style={status === 0?{width:"18px", height:"18px"}:{width:"31px", height:"31px"}} alt="" />
        </div>
    )
}

export default SpecialTaskCard;