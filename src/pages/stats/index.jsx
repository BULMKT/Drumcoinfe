import React, { useEffect, useState } from "react";

import config from '../../config'

import Footer from "../../layout/footer/inex";

import balanceIcon from "../../assets/balance.png"

import "./index.css"

const Stats = () =>{

    const [info, setInfo] = useState({});
    const [coins, setCoins] = useState(0);

    useEffect(()=>{
        const run = async() =>{

            let token = localStorage.getItem("token");
            token = "Bear " + token;
            
            let url = config.main_url + `stats/`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then((rsp)=>{
                return rsp.json()
            })
            // console.log(response);

            setInfo(response.status);
            if(localStorage.getItem("coins")!==null){
                setCoins(Number(localStorage.getItem("coins")));
            }
            else setCoins(response.coins);
        }

        run();
    }, [])

    const formatNumber = (number) => {
        const formattedNumber = new Intl.NumberFormat().format(number);
        return formattedNumber;
    }

    return (
        <div className="stats-page">
            <div className="stats-page-header">
                <span>Total Share Balance</span>
                <div>
                    <img src={balanceIcon} alt="" />
                    <h1>{coins}</h1>
                </div>
            </div>
            <hr />
            <div className="stats-disply">
                <div>
                    <p>Total Touches:</p>
                    <div>
                        <h1>{formatNumber(info.totalTouchs)}</h1>
                    </div>
                </div>
                <div>
                    <p>Total Players:</p>
                    <div>
                        <h1>{formatNumber(info.totalPlayers)}</h1>
                    </div>
                </div>
                <div>
                    <p>Daily Users:</p>
                    <div>
                        <h1>{formatNumber(info.dailyUsers)}</h1>
                    </div>
                </div>
                <div>
                    <p>Online Players:</p>
                    <div>
                        <h1>{formatNumber(info.onlinePlayers)}</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Stats