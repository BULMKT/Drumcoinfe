import React from "react";
import { useNavigate } from "react-router-dom";


import BoostIcon from '../../assets/fireball.png'
import TaskIcon from '../../assets/check.png'
import TapIcon from '../../assets/TapButton.png'
import RefIcon from '../../assets/puzzle.png'
import StatesIcon from '../../assets/chart.png'


import Button1 from "../../components/button1";

import "./index.css"

const Footer = () =>{
    const navigate = useNavigate();
    return (
        <div className='footer-button-group'>
            <Button1 clickHandler={()=>{navigate("/boost")}} imgPath={BoostIcon} title = {"Boost"} />
            <Button1 clickHandler={()=>{navigate("/task")}} imgPath={TaskIcon} title = {"Task"}/>
            <Button1 clickHandler={()=>{navigate("/")}} imgPath={TapIcon} title={"Tap"}/>
            <Button1 clickHandler={()=>{navigate("/referals")}} imgPath={RefIcon} title={"Ref"}/>
            <Button1 clickHandler={()=>{navigate("/stats")}} imgPath={StatesIcon} title={"Stats"}/>
        </div>
    )
}

export default Footer;