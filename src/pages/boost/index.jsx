import React, { useEffect, useState } from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";

import { getInitInfo, boostGru, boostTank, boostItem, buyBot } from "../../api/boost";
import { tap } from '../../api/user'

import Footer from "../../layout/footer/inex";
import Loader from "../../components/Loader";
// import BoostModal from "../../components/BoostModal";
import ConfirmModal from "../../components/ConfirmModal";

import "./index.css"

import balanceIcon from "../../assets/balance.png"
import batterIcon from "../../assets/battery.png"
import fireIcon from "../../assets/firefire.png"
import handIcon from "../../assets/hand.png"
import lightIcon from "../../assets/light.png"
import roboIcon from "../../assets/robot.png"
import rightArrowIcon from "../../assets/right_arrow.png"

const multiTapBoostInfos = [
    {tap:1, cost:500},
    {tap:2, cost:2000},
    {tap:3, cost:5000},
    {tap:4, cost:10000},
    {tap:5, cost:20000},
    {tap:6, cost:40000},
    {tap:7, cost:80000},
    {tap:8, cost:100000},
    {tap:9, cost:150000},
    {tap:10, cost:200000},
    {tap:11, cost:250000},
    {tap:12, cost:300000}
]

const energyLimitBoostInfos = [
    {maxEnergy:500, cost:500},
    {maxEnergy:1000, cost:3000},
    {maxEnergy:1500, cost:6000},
    {maxEnergy:2000, cost:12000},
    {maxEnergy:2500, cost:24000},
    {maxEnergy:3000, cost:50000},
    {maxEnergy:3500, cost:100000},
    {maxEnergy:4000, cost:200000},
    {maxEnergy:4500, cost:300000},
    {maxEnergy:5000, cost:400000},
    {maxEnergy:5500, cost:600000},
    {maxEnergy:6000, cost:800000},
    {maxEnergy:6600, cost:1000000},
    {maxEnergy:7000, cost:2000000}
]

const rechargeSpeedBoostInfos = [
    {speed:5, cost: 2000},
    {speed:4, cost: 30000},
    {speed:3, cost: 100000},
    {speed:2, cost: 200000},
    {speed:1, cost: 200000}
]

const Boost = () =>{
    
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [league, setLeague] = useState(0);

    const [isModalShow, setIsModalShow] = useState(false);
    // const [modalContent, setModalContent] = useState("Are you sure to boost this?");
    // const [currentBoostType, setCurrentBoostType] = useState("");
    // const [currentBoostAmount, setCurrentBoostAmount] = useState(-1);
    // const [currentCost, setCurrentCost] = useState(0);
    // const [isOkShown, setIsOkShown] = useState(true);

    useEffect(()=>{
        let run = async() =>{
            let res = await getInitInfo();
            // console.log(res.info);
            if(localStorage.getItem("coins") !== null){
                res.info.coins = Number(localStorage.getItem("coins"));
            }
            if(localStorage.getItem("league") !== null){
                setLeague(Number(localStorage.getItem("league")));
            }
            setUserInfo(res.info);
            localStorage.setItem("balance", res.info.coins);
            setIsLoading(false);
        }

        run();
    },[])

    const handleGruClick = async() =>{
        if(userInfo.gruAvailableAmount === 0) return;
        setIsLoading(true);
        let res = await boostGru();
        // console.log(res);
        localStorage.setItem("isGru", "true");
        navigate('/');
        setIsLoading(false)
    }

    const handleTankClick = async() =>{
        if(userInfo.tankAvailableAmount === 0) return;
        
        setIsLoading(true);

        let res = await boostTank();
        
        let coins = -1;
        if(localStorage.getItem("coins") !== null) coins = Number(localStorage.getItem("coins"));
        let usd = -1;
        if(localStorage.getItem("usd") !== null) usd = Number(localStorage.getItem("usd"));

        setUserInfo({...userInfo, tankAvailableAmount: userInfo.tankAvailableAmount - 1});

        localStorage.removeItem("coins");
        localStorage.removeItem("usd");
        localStorage.removeItem("energy");
        localStorage.removeItem("lastEnergyDate");
        localStorage.setItem("is_bot_working", "1");

        await tap({currentEnergy: -1, amountOfUSD: usd, amountOfcoin:coins, lastEnergyAt:new Date()});

        // console.log(res);
        setIsLoading(false);
    }

    const handleModalOk  = async(currentBoostType, currentBoostAmount, currentCost) =>{
        let res = await boostItem(currentBoostType, currentBoostAmount);
        // console.log(res);
        let coins = userInfo.coins - currentCost;
        let energy = -1;
        let lastEnergyAt;
        if(localStorage.getItem("energy") !== null){
            energy = Number(localStorage.getItem("energy"));
            lastEnergyAt = localStorage.getItem("lastEnergyDate");
        }
        let usd = -1;
        if(localStorage.getItem("usd") !== null) usd = Number(localStorage.getItem("usd"));

        localStorage.removeItem("coins");
        localStorage.removeItem("usd");
        localStorage.removeItem("energy");
        localStorage.removeItem("lastEnergyDate");

        await tap({currentEnergy: energy, amountOfUSD: usd, amountOfcoin:coins, lastEnergyAt});

        if(currentBoostType === "multi_tap"){
            setUserInfo({...userInfo, multiTapLevel: userInfo.multiTapLevel + 1, coins: userInfo.coins - currentCost});
        } else if (currentBoostType === "energy_limit"){
            setUserInfo({...userInfo, energyLimitLevel: userInfo.energyLimitLevel + 1, coins: userInfo.coins - currentCost});
        } else if (currentBoostType === "recharge_speed"){
            setUserInfo({...userInfo, rechargeSpeedLevel: userInfo.rechargeSpeedLevel + 1, coins: userInfo.coins - currentCost});
        }

        setIsLoading(false);
    }

    const handleModalCancel = async() =>{
        setIsModalShow(false);
    }

    const handleMultiTapBoost = () =>{
        let lvl = userInfo.multiTapLevel;
        // if(multiTapBoostInfos[lvl].cost>userInfo.coins || lvl>league){
        //     setIsModalShow(true);
        //     return;
        // }
        setIsLoading(true);
        handleModalOk("multi_tap", multiTapBoostInfos[lvl].tap, multiTapBoostInfos[lvl].cost);
    }

    const handleEnergyLimitBoost = () =>{
        let lvl = userInfo.energyLimitLevel;
        // if(energyLimitBoostInfos[lvl].cost>userInfo.coins || lvl>league){
        //     setIsModalShow(true);
        //     return;
        // }
        setIsLoading(true);
        handleModalOk("energy_limit", energyLimitBoostInfos[lvl].maxEnergy, multiTapBoostInfos[lvl].cost);
    }

    const handleRechargeSpeedBoost = () =>{
        let lvl = userInfo.rechargeSpeedLevel;
        // if(rechargeSpeedBoostInfos[lvl].cost>userInfo.coins || lvl>league){
        //     setIsModalShow(true);
        //     return;
        // }
        setIsLoading(true);
        handleModalOk("recharge_speed", rechargeSpeedBoostInfos[lvl].speed, rechargeSpeedBoostInfos[lvl].cost);
    }

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

    const handleTapBoostClick = () =>{
        handleGetClick();
        // navigate("/tapbot");
    }

    const [isMultiTapActived, setIsMultiTapActived] = useState(false);
    const [isEnergyLimitActived, setIsEnergyLimitActived] = useState(false);
    const [isRechargSpeedActived, setIsRechargSpeedActived] = useState(false);
    const [isBotBoostActived, setIsBotBoostActived] = useState(false);

    useEffect(()=>{
        let lvl = userInfo.multiTapLevel;
        if(multiTapBoostInfos[lvl] === undefined) return;
        
        if(multiTapBoostInfos[lvl].cost>userInfo.coins || lvl>=12){
            setIsMultiTapActived(false);   
            return;
        }
        setIsMultiTapActived(true);
    }, [userInfo])

    useEffect(()=>{
        let lvl = userInfo.energyLimitLevel;
        if(energyLimitBoostInfos[lvl] === undefined) return;
        if(energyLimitBoostInfos[lvl].cost>userInfo.coins || lvl>=14){
            setIsEnergyLimitActived(false);
            return;
        }
        setIsEnergyLimitActived(true);
    }, [userInfo])

    useEffect(()=>{
        let lvl = userInfo.rechargeSpeedLevel;
        if(rechargeSpeedBoostInfos[lvl] === undefined) return;
        if(rechargeSpeedBoostInfos[lvl].cost>userInfo.coins || lvl>=5){
            setIsRechargSpeedActived(false);
            return;
        }
        setIsRechargSpeedActived(true);
    }, [userInfo]);

    useEffect(()=>{
        if(userInfo.coins === undefined || userInfo.coins===null) return;
        if(userInfo.coins<100000){
            setIsBotBoostActived(false);
            return;
        }
        setIsBotBoostActived(true);
    }, [userInfo])

    const [isBotActivated, setIsBotActived] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("is_bot_activate") === "1") setIsBotActived(true);
        else setIsBotActived(false);
    }, [])

    return (
        isLoading?<Loader isFirst={false}/>:
        <div className="boost-page">
            {
                isModalShow?<ConfirmModal handleCloseClick={handleModalCancel}/>:<></>
            }
            <div className="booster-page-header">
                <span>Your Share Balance</span>
                <div>
                    <img src={balanceIcon} alt="" />
                    <h1>{userInfo.coins}</h1>
                </div>
            </div>
            <hr />
            <div className="daily-boosters">
                <span>Daily Boosters:</span>
                <div>
                    <div className="tapping-gru" onClick={handleGruClick}>
                        <img src={fireIcon} alt="" />
                        <div>
                            <h4>Tapping Guru</h4>
                            <span>{userInfo.gruAvailableAmount}/3</span>
                        </div>
                    </div>
                    <div className="full-tank" onClick={handleTankClick}>
                        <img src={lightIcon} alt="" />
                        <div>
                            <h4>Full Tank</h4>
                            <span>{userInfo.tankAvailableAmount}/3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="boosters">
                <span>Boosters:</span>
                <div className="boosters-item" style={isMultiTapActived?{backgroundColor:"#000000"}:{backgroundColor:"grey"}} onClick={isMultiTapActived ? handleMultiTapBoost :()=>{}}>
                    <div className="img-div">
                        <img src={handIcon} alt="" />
                    </div>
                    <div>
                        <h2>Multi Tap</h2>
                        <div className="bosters-item-bottom">
                            <img src={balanceIcon} alt="" />
                            <span className="boosters-bouns">{userInfo.multiTapLevel < 12?multiTapBoostInfos[userInfo.multiTapLevel].cost:"Ended"}</span>
                            <span>&nbsp;| Level {userInfo.multiTapLevel + 1}</span>
                        </div>
                    </div>
                    <img src={rightArrowIcon} alt="" />
                </div>
                <div className="boosters-item" style={isEnergyLimitActived?{backgroundColor:"#000000"}:{backgroundColor:"grey"}} onClick={isEnergyLimitActived?handleEnergyLimitBoost:()=>{}}>
                    <div className="img-div">
                        <img src={batterIcon} alt="" />
                    </div>
                    <div>
                        <h2>Energy Limit</h2>
                        <div className="bosters-item-bottom">
                            <img src={balanceIcon} alt="" />
                            <span className="boosters-bouns">{userInfo.energyLimitLevel<14?energyLimitBoostInfos[userInfo.energyLimitLevel].cost:""}</span>
                            <span>&nbsp;| Level {userInfo.energyLimitLevel + 1}</span>
                        </div>
                    </div>
                    <img src={rightArrowIcon} alt="" />
                </div>
                <div className="boosters-item" style={isRechargSpeedActived?{backgroundColor:"#000000"}:{backgroundColor:"grey"}} onClick={isRechargSpeedActived?handleRechargeSpeedBoost:()=>{}}>
                    <div className="img-div">
                        <img src={lightIcon} alt="" />
                    </div>
                    <div>
                        <h2>Recharge Speed</h2>
                        <div className="bosters-item-bottom">
                            <img src={balanceIcon} alt="" />
                            <span className="boosters-bouns">{userInfo.rechargeSpeedLevel<5?rechargeSpeedBoostInfos[userInfo.rechargeSpeedLevel].cost:"Ended"}</span>
                            <span>&nbsp;| Level {userInfo.rechargeSpeedLevel + 1}</span>
                        </div>
                    </div>
                    <img src={rightArrowIcon} alt="" />
                </div>
                <div className="boosters-item" style={isBotBoostActived && !isBotActivated ? {backgroundColor:"#000000"} : isBotActivated ?{backgroundColor:"grey"}:{backgroundColor:"grey"}} onClick={isBotBoostActived && !isBotActivated ? handleTapBoostClick:()=>{}}>
                    <div className="img-div">
                        <img src={roboIcon} alt="" />
                    </div>
                    <div>
                        <h2>Tap Bot</h2>
                        <div className="bosters-item-bottom">
                            <img src={balanceIcon} alt="" />
                            <span className="boosters-bouns">100000</span>
                        </div>
                    </div>
                    <img src={rightArrowIcon} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Boost