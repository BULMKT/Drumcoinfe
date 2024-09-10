
import config from '../config'

export const getInitInfo = async () =>{
    
    let token = localStorage.getItem("token");
    token = "Bear " + token;

    // console.log(token);
    
    let url = config.main_url + `boost/`;


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const boostGru = async () =>{
    
    let token = localStorage.getItem("token");
    token = "Bear " + token;

    let url = config.main_url + `boost/gru_boost`;


    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const boostTank = async () =>{
    
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `boost/tank_boost`;


    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const boostItem = async(boostType, boostAmount) =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `boost/${boostType}`;


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body:JSON.stringify({
            amount: boostAmount
        })
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}

export const buyBot = async() =>{
    let token = localStorage.getItem("token");
    token = "Bear " + token;
    
    let url = config.main_url + `boost/bot`;


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then((rsp)=>{
        return rsp.json()
    })

    return response;
}