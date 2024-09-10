import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {login, tap, setBotWorking} from '../../api/user'

import Loader from '../../components/Loader';
import ClaimPopUp from '../../components/ClaimPopUp';

import blanceImage from "../../assets/balance.png";
import cupIcon from '../../assets/cup.png'
import tapIcon from '../../assets/tap.png'
import claimIcon from '../../assets/CLAIM.png'
import energyIcon from '../../assets/energy.png'
import gruIcon from '../../assets/firefire.png'
import botIcon from '../../assets/robot.png'
import Bot from "../../assets/robot.png"
import heart from "../../assets/heart.png"
import coin from "../../assets/balance.png"

import Footer from "../../layout/footer/inex";

import "./index.css"
import "./fire.css"

const leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Teacher", "Big teacher", "Elite", "Legendary"] 
const leagueAmount = [30000, 80000, 150000, 300000, 400000, 600000, 800000, 1000000, 1500000]
const leagueCup = ["bronz.png", "silver.png", "gold.png", "platinum.png", "diamond.png", "teacher.png", "Big teacher.png", "elite.png", "legendary.png"]

const Home = (props) =>{

    const [user, setUser] = useState({});
    const [isTapable, setIsTapable] = useState(true);
    const [flyingText, setFlyingText] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [remain, setRemain] = useState(0);
    const [isGr, setIsGr] = useState(false);
    const [isBot, setIsBot] = useState(false);
    const [GruTap, setGruTap] = useState(1);
    // const [tapCount, setTapCount] = useState(0);
    const [isClaimOpen, setIsClaimOpen] = useState(false);

    var botInterval;

    const handleTap = async() =>{

        if(isTapable === false || user.lastEnergy === 0) return;
        // setIsTapable(false);
        up();
        let amountOfcoin = user.multiTap * 1 * GruTap;
        let updatedUSD = user.tapsInUSD + amountOfcoin * 0.001;
        updatedUSD = Number(updatedUSD.toPrecision(8));
        let currentEnergy =user.lastEnergy - 1;
        // console.log(typeof user.tapCount);

        localStorage.setItem("coins", String(user.coins + amountOfcoin));
        localStorage.setItem("energy", String(currentEnergy));
        localStorage.setItem("usd", String(updatedUSD));
        // setTapCount(pre=>{
        //     return pre + 1;
        // })
        // console.log(tc);
        let now = new Date();
        if(localStorage.getItem("lastEnergyDate") === null) localStorage.setItem("lastEnergyDate", now.toString());

        setUser({...user, tapsInUSD: updatedUSD, coins: user.coins + amountOfcoin, lastEnergy: currentEnergy});
 
    }

    const up = () =>{
        let randomAngle = 45 + Math.random() * 90;
        let radians = (randomAngle * Math.PI) / 180;
        let xOffset = 10;
        let yOffset = -100;
        let flyingTextContent = `+${user.multiTap*GruTap}`

        let newText = {
            id: Date.now(),
            x: 50,
            y: 50,
            xOffset: xOffset,
            yOffset: yOffset,
            rotationAngle: `${90 - randomAngle}deg`,
            content: flyingTextContent,
        };

        setFlyingText([...flyingText, newText]);
    }

    useEffect(()=>{
        if(user.league === undefined) return;
        // console.log(user.league, "^^^^^", user.coins);
        if(user.tapCount>=350000){
            setUser({...user, league: 8});
        }
        else if(leagueAmount[user.league]<user.tapCount){
            setUser({...user, league: user.league + 1});
        }
    }, [user.tapCount])

    useEffect(()=>{
        if(user.league > 8) setUser({...user, league: 8});
        localStorage.setItem("league", String(user.league))
    }, [user.league])

    useEffect(()=>{
        if(user.rechargeSpeed === undefined) return;

        let delay = user.rechargeSpeed;

        let interval = setInterval(() => {
            setRemain(prevv=>{
                // console.log("Remain ===> ", prevv);
                if(user.lastEnergy >= user.energyLimit && user.isBotActivated){
                    setUser(prev=>{
                        return {...prev, isBotWorking: true};
                    })
                    setBotWorking(true);
                    localStorage.setItem("is_bot_working", "1");
                    return 0;
                }
                let kk = prevv + 5;
                if(kk/delay < 1) return kk;
                setUser((prev)=>{
                    if(prev.lastEnergy >= prev.energyLimit) return prev;
                    let now = new Date();
                    let updatedEnergy = prev.lastEnergy + Math.floor(kk/delay);
                    updatedEnergy = updatedEnergy > user.energyLimit ? user.energyLimit : updatedEnergy;
                    localStorage.setItem("energy", String(updatedEnergy));
                    localStorage.setItem("lastEnergyDate", now.toString());
                    // console.log("lastEnergy ===> ", prev.lastEnergy + 1);
                    return{...prev, lastEnergy: updatedEnergy};
                })
                return kk%delay;
            })
        }, 5000);
        
        return ()=>clearInterval(interval)
    }, [user.rechargeSpeed])

    const [claAmount, setClaAmount] = useState(0);

    useEffect(()=>{
        setIsLoading(true);
        const run = async() =>{
            let name;
            if(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData){
                const params = new URLSearchParams(window.Telegram.WebApp.initData);
                const user = JSON.parse(decodeURIComponent(params.get('user')));
                name = user.username;
                // alert(name);
            }
            else name = "alex";
            let res = await login(name);
            let fff = false;
            if(localStorage.getItem("coins") !== null || localStorage.getItem("energy") !== null || localStorage.getItem("is_bought_moment_ago") === "1"){
                // console.log("------+--------+-------+---");
                // console.log(localStorage.getItem("coins"));
                // console.log(localStorage.getItem("energy"));
                // console.log(localStorage.getItem("is_bought_moment_ago"));

                fff = true;
                console.log("saved on local!");
                if(localStorage.getItem("coins") !== null) res.info.coins = Number(localStorage.getItem("coins"));
                if(localStorage.getItem("usd") !== null) res.info.tapsInUSD = Number(localStorage.getItem("usd"));
                if(localStorage.getItem("lastEnergyDate") !== null) res.info.lastEnergyAt = localStorage.getItem("lastEnergyDate");
                if(localStorage.getItem("energy") !== null) res.info.lastEnergy  = Number(localStorage.getItem("energy"));
                // await tap({currentEnergy: res.info.lastEnergy, amountOfUSD:  res.info.tapsInUSD, amountOfcoin: res.info.coins, lastEnergyAt: now.toString()});

                localStorage.removeItem("coins");
                localStorage.removeItem("usd");
                localStorage.removeItem("energy");
                localStorage.removeItem("lastEnergyDate");
            }
            // res.info.isBotActivate = false;
            // res.info.isBotWorking = false;
            let claimedAmount = 0;
            if(localStorage.getItem("is_bot_activate") !== null && localStorage.getItem("is_bot_activate") !== undefined && res.info.lastEnergyAt !== null && res.info.lastEnergyAt !== undefined){
                let last = new Date(res.info.lastEnergyAt);
                let now = new Date();
                let energy = res.info.lastEnergy;
                let maxEnergy = res.info.energyLimit;
                let isBotWorking = Number(localStorage.getItem("is_bot_working"));
                let isBotActivate = Number(localStorage.getItem("is_bot_activate"));
                let botEndTime = new Date(localStorage.getItem("bot_end_time"));
                console.log("last =>", last);
                // alert(last);
                console.log("now =>", now);
                // alert(now);
                console.log("energy =>", energy);
                // alert(energy);
                console.log("maxEnergy =>", maxEnergy);
                // alert(maxEnergy);
                console.log("isBotWorking =>", isBotWorking);
                // alert(isBotWorking);
                console.log("isBotActivate =>", isBotActivate);
                console.log("botEndTime =>", botEndTime);
                // alert(botEndTime);
                if(isBotActivate){
                    res.info.isBotActivated = true;
                    console.log("Bot is activated!");
                    while(1){
                        if(isNaN(last)) break;
                        if(isBotWorking){
                            res.info.isBotWorking = true;
                            console.log(`Bot is working at ${last.toString()}`);
                            let  dif = Math.floor((botEndTime.getTime()-last.getTime())/1000);;
                            if(dif<=energy){
                                console.log("botworking botend dif ", dif, energy);
                                res.info.lastEnergyAt = botEndTime.toString();
                                res.info.lastEnergy = energy - dif;
                                res.info.coins += dif * res.info.multiTap;
                                claimedAmount += dif * res.info.multiTap;
                                console.log("+++", dif * res.info.multiTap);
                                res.info.tapsInUSD += dif * 0.001 * res.info.multiTap;
                                res.info.isBotWorking = false;
                                res.info.isBotActivated = false;
                                localStorage.setItem("is_bot_activate", "0");
                                break;
                            }

                            dif = Math.floor((now.getTime()-last.getTime())/1000);
                            if(dif<=energy){
                                console.log("botworking now dif ", dif, energy);
                                res.info.lastEnergyAt = now.toString();
                                res.info.lastEnergy = energy - dif;
                                res.info.coins += dif * res.info.multiTap;
                                console.log("+++", dif * res.info.multiTap);
                                claimedAmount += dif * res.info.multiTap;
                                res.info.tapsInUSD += dif * 0.001 * res.info.multiTap;
                                res.info.isBotWorking = true;
                                break;
                            }

                            isBotWorking = 0;
                            localStorage.setItem("is_bot_working", "0");
                            last.setSeconds(last.getSeconds() + energy);
                            res.info.coins += energy * res.info.multiTap;
                            res.info.tapsInUSD += energy * 0.001 * res.info.multiTap;
                            claimedAmount += energy * res.info.multiTap;
                            console.log("+++", energy * res.info.multiTap);
                            res.info.lastEnergy = 0;
                            energy = 0;
                            res.info.isBotWorking = false;
                        } else{
                            res.info.isBotWorking = false;
                            console.log(`Bot is not working at ${last.toString()} to full charge`);
                            let  dif = Math.floor((botEndTime.getTime()-last.getTime())/1000);;
                            if(dif < (maxEnergy - energy) * res.info.rechargeSpeed){
                                console.log("bot not working botend dif ", dif, (maxEnergy - energy) * res.info.rechargeSpeed);
                                res.info.lastEnergyAt = last.toString();
                                localStorage.setItem("is_bot_working", "0");
                                localStorage.setItem("is_bot_activate", "0");
                                res.info.isBotWorking = false;
                                res.info.isBotActivated = false;
                                break;
                            }

                            dif = Math.floor((now.getTime()-last.getTime())/1000);
                            if(dif < (maxEnergy - energy) * res.info.rechargeSpeed){
                                console.log("bot not working now dif ", dif, (maxEnergy - energy) * res.info.rechargeSpeed);
                                res.info.lastEnergyAt = last.toString();
                                localStorage.setItem("is_bot_working", "0")
                                res.info.isBotWorking = false;
                                break;
                            }

                            isBotWorking = 1;
                            localStorage.setItem("is_bot_working", "1");
                            res.info.isBotWorking = true;
                            last.setSeconds(last.getSeconds() + (maxEnergy - energy) * res.info.rechargeSpeed);
                            
                            energy = maxEnergy;
                        }
                    }
                } else{
                    localStorage.setItem("is_bot_working", "0");
                    res.info.isBotWorking = false;
                    res.info.isBotActivated = false;
                }
            }

            console.log("---------------------");

            console.log("Now energy ===> " , res.info.lastEnergy );

            let lastEnergyAt = new Date(res.info.lastEnergyAt);
            if(!isNaN(lastEnergyAt)){
                let now = new Date();
                console.log("Now Data =>", now.toString());
                console.log("Last Date =>", lastEnergyAt.toString());
                let dif = Math.floor((now.getTime()-lastEnergyAt.getTime()) / 1000);
                console.log("Now dif==>", dif);
                let inc = Math.floor(dif / res.info.rechargeSpeed);
                let remain = dif % res.info.rechargeSpeed
                setRemain(remain);
                if(inc>0){
                    console.log("inc ===>> ", inc);
                    inc = inc + res.info.lastEnergy;
                    inc = inc < res.info.energyLimit ? inc : res.info.energyLimit;
                    res.info.lastEnergy = inc;
                }
                now.setSeconds( now.getSeconds() - remain );
                localStorage.setItem("lastEnergyDate", now.toString());
                localStorage.setItem("energy", String(res.info.lastEnergy));
                await tap({currentEnergy: res.info.lastEnergy, amountOfUSD: res.info.tapsInUSD, amountOfcoin:res.info.coins, lastEnergyAt: now.toString()});

                console.log("last last last energy => ", res.info.lastEnergy);
            }

            let usd = res.info.coins * 0.001;
            res.info.tapsInUSD = Number(usd.toPrecision(8));
            if(localStorage.getItem("is_bought_moment_ago") === "1"){
                localStorage.removeItem("is_bought_moment_ago");
                setClaAmount(0);
            }
            else if(localStorage.getItem("open") === "true"){
                localStorage.removeItem("open");
                setClaAmount(claimedAmount);
            }
            let utc = localStorage.getItem("userTapCount");
            if( utc !== null && utc !== undefined){
                res.info.tapCount = Number(utc);
            }
            else{
                localStorage.setItem("userTapCount", String(res.info.tapCount));
            }
            setUser(res.info)
            localStorage.setItem("token", res.token);
            // console.log(res.token);
            setIsLoading(false);
        }
        
        run();
    }, [])

    useEffect(()=>{
        if(user.multiTap === undefined) return;
        let isGru = localStorage.getItem("isGru");
        // console.log("isGru ====>", isGru);
        if(isGru === "true"){
            localStorage.removeItem("isGru");
            setIsGr(true);
            setGruTap(5);
            document.getElementById("root").style.backgroundImage = "";
            setTimeout(() => {
                setGruTap(1);
                setIsGr(false);
                document.getElementById("root").style.backgroundImage = "url(./background.png)";
            }, 20000);
        }
    }, [user.multiTap])

    useEffect(()=>{
        // console.log("ok1");
        if(!user.isBotActivated || !user.isBotWorking){
            // console.log("here is 211");
            return;
        }
        if(user.lastEnergy === undefined || user.energyLimit === undefined) return;
        // if(user.lastEnergy !== user.energyLimit){
        if(user.lastEnergy === 0){
            // console.log("here is 214")
            const run = async() =>{
                clearInterval(botInterval);
                setUser(prev=>{
                    return {...prev, isBotWorking: false};
                })
                await setBotWorking(false);
                localStorage.setItem("is_bot_working", "0");
                return;
            }

            run();
            return;
        }
        // console.log("ok2");
        botInterval = setInterval(() => {
            let now = new Date();
            let endDate = new Date(localStorage.getItem("bot_end_time"));
            if(endDate<=now){
                localStorage.setItem("is_bot_activate", "0");
                localStorage.setItem("is_bot_working", "0");
                setUser({...user, isBotActivated: false, isBotWorking: false});
                clearInterval(botInterval);
                return;
            }
            handleTap();
        }, 1000);
        
        return ()=>clearInterval(botInterval)
    }, [user.lastEnergy, user.isBotWorking])

    const handleTapByUser = async() =>{
        let tc = Number(localStorage.getItem("userTapCount")) + 1;
        console.log("tc ===>", tc);
        localStorage.setItem("userTapCount", String(tc));
        setUser({...user,tapCount: tc });
        await handleTap();
    }

    return(
        isLoading ? <Loader isFirst={true} />:
        <div className='home'>
            {isClaimOpen?<ClaimPopUp handleScreenClick={()=>{setIsClaimOpen(false)}}/>:""}
            <div className='boost-state'>
                {/* {user.isBotActivated?<img src={botIcon} style={{opacity:user.isBotWorking?1:0.5}} alt="" />:<></>} */}
            </div>
            <div className='user-info'>
                <span><p>{user.leftDays} DAY</p></span>
                <span><p>${user.tapsInUSD}</p></span>
            </div>
            <div>
                <div className='balance-display'>
                    <img src={blanceImage} alt="balance" />
                    <span>{user.coins}</span>
                </div>
                <div className='bronze-display'>
                    <img src={`../../assets/cups/${leagueCup[user.league]}`} alt="cup" />
                    <span>{leagues[user.league]}</span>
                </div>
            </div>
            {flyingText?.map((text) => (
                <div
                    key={text.id}
                    className="flying-text"
                    style={{
                        left: `50vw`,
                        top: `200px`,
                        '--x-offset': `${text.xOffset}px`,
                        '--y-offset': `${text.yOffset}px`,
                        '--rotate-angle': text.rotationAngle,
                    }}
                >
                    {text.content}
                </div>
            ))}
            <div className={isGr?'tap-div gru':'tap-div'}>
                {isGr?<div className='flame'></div>:""}
                <img src={tapIcon}  onClick={()=>{handleTapByUser()}} alt="tap" className='tap'/>
            </div>
            <img src={claimIcon} alt="claim" onClick={()=>{setIsClaimOpen(true)}} className='claim-image'/>
            <div className='energy-display'>
                <div className='energy-amount'>
                    <img src={energyIcon} alt="energy" />
                    <div className='energy-amount-number'>
                        <span>{user.lastEnergy}</span>
                        <span>/</span>
                        <span>{user.energyLimit}</span>
                    </div>
                </div>
                <div className='energy-progress'>
                    <div style={{width: `${100 * user.lastEnergy/user.energyLimit}%`}}>
                    </div>
                </div>
            </div>
            <div style={{height:'150px'}}>&nbsp;</div>
            <Footer />
            {
                claAmount===0?<></>:<div className="tap-bot-pop" style={{position:"fixed"}}>
                <div style={{position:"fixed", top:"30px", width:"90vw"}}>   
                    <div className="bot-effect-pop">
                        <img src={Bot} alt="" />
                    </div>
                    <div style={{width:"50px", marginRight:"5px", display:"flex", alignItems:"center"}}>
                        <h3>TAPBOT</h3>
                    </div>
                    <div style={{margin:"5px", paddingBottom:"3px", display:"flex", flexDirection:"column"}}>
                        <p style={{marginBottom:"5px"}}>Your income from the</p>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <p>Robot: </p>
                            <img src={coin} alt="" style={{height:"15px", width:"15px", marginRight:"5px"}}/>
                            <h4>{claAmount}</h4>
                        </div>
                    </div>
                    <button onClick={()=>{setClaAmount(0)}}><h1>CLAIM</h1></button>
                </div></div>
            }
        </div>
    )
}

export default Home;