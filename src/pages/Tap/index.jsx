import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { tap } from "../../api/user";
import { buyBot } from "../../api/boost";

import Footer from "../../layout/footer/inex";
import Loader from "../../components/Loader";

import "./index.css"

import Bot from "../../assets/robot.png"
import heart from "../../assets/heart.png"
import coin from "../../assets/balance.png"

const TapBot = () =>{

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleGetClick = async() =>{
        setIsLoading(true);
        let coins = Number(localStorage.getItem("balance")) - 100000;
        let energy = -1;
        let lastEnergyAt;
        if(localStorage.getItem("energy") !== null && localStorage.getItem("energy") !== undefined){
            energy = Number(localStorage.getItem("energy"));
            lastEnergyAt = localStorage.getItem("lastEnergyDate");
        }
        let usd = -1;
        if(localStorage.getItem("usd") !== null) usd = Number(localStorage.getItem("usd"));

        localStorage.setItem("is_bot_working", "1");
        localStorage.setItem("is_bot_activate", "1");
        let now = new Date();
        lastEnergyAt = now.toString();
        localStorage.setItem("lastEnergyDate", now.toString());
        now.setSeconds( now.getSeconds() + 12*3600 );
        localStorage.setItem("bot_end_time", now.toString());
        localStorage.setItem("is_bought_moment_ago", "1");

        localStorage.removeItem("coins");
        localStorage.removeItem("usd");
        localStorage.removeItem("energy");

        // console.log(coins, usd, energy, lastEnergyAt);

        await tap({currentEnergy: energy, amountOfUSD: usd, amountOfcoin:coins, lastEnergyAt});
        await buyBot();
        setIsLoading(false);
        navigate("/")
    }

    return (
        isLoading?<Loader isFirst={false}/>:
        <>
        <div className="tap-bot">
            <div>   
                <div className="bot-effect">
                    <img src={Bot} alt="" />
                </div>
                <h2>TAP BOT</h2>
                <p>While you were away, your Tap Bot Earned</p>
                <div className="heart-section">
                    <p>some shares for you!</p>
                    <img src={heart} alt="" />
                </div>
                <div className="tap-coin">
                    <img src={coin} alt="" />
                    <h3>100000</h3>
                </div>
                <button onClick={handleGetClick}><h1>Get It!</h1></button>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default TapBot