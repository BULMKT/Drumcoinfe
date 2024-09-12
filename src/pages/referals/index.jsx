import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

import { getReferalInfo } from "../../api/user";

import Loader from "../../components/Loader";

import './index.css'

import Footer from "../../layout/footer/inex";
import ReferalCard from '../../components/ReferalCard'

import copyIcon from "../../assets/copy.png"

const leagues = [30000, 80000, 150000, 300000, 400000, 600000, 800000, 1000000, 1500000]

const Referals = () =>{

    const [info, setInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        setIsLoading(true);
        const run = async()=>{
            let res = await getReferalInfo();
            res =   res.info;
            let url = `https://t.me/Drum_CoinBot?start=r_${res.userId}`;
            setInfo({...res, url});
            // console.log(res);
            setIsLoading(false);
        } 

        run()
    }, [])

    const [copyText, setCopyText] = useState("Copy");
    const handleCopyTextClick = async() =>{
        await copy(info.url);
        setCopyText("Copied");
        setTimeout(() => {
            setCopyText("Copy");
        }, 2000);
    }

    return (
        isLoading ? <Loader isFirst={false}/>:
        <div className="referals-page">
            <h1>{info.numOfRef} Referals</h1>
            <h3>+{info.balanceByRef}</h3>
            <div className="my-invite-link">
                <div><h2>My Invite Link:</h2><div>&nbsp;</div><span onClick={handleCopyTextClick}><img src={copyIcon} alt="" /><p>{copyText}</p></span></div>
                <p>{info.url}</p>
            </div>
            <div className="my-referal">
                <h2>My Referrals:</h2>
            </div>
            <div className="ref-task-list">
                {
                    info.friends?.map(friend=><ReferalCard title={friend.name} coins={friend.coins} plus={friend.rewardByReferal} progress={
                        friend.league===0 ? Math.floor(100*friend.coins/leagues[friend.league]) : Math.floor(100*friend.coins/leagues[friend.league])}    
                    />)
                }
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
                <ReferalCard title={"Friend"} coins={125} plus={1500} progress={34} />
            </div>
            <div style={{height:"150px"}}></div>
            <Footer />
        </div>
    )
}

export default Referals