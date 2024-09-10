import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { initMiniApp } from '@telegram-apps/sdk';
import { isDesktop } from 'react-device-detect';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import { logOut } from './api/user';

import Home from "./pages/home/index"
import Task from './pages/task/index'
import Referals from './pages/referals/index'
import Boost from './pages/boost/index'
import TapBot from './pages/Tap/index'
import Stats from './pages/stats/index'
import BanPage from './pages/BanPage';

import './App.css';

import "./fonts/HelveticaInserat.ttf" 

function App() {

  const [miniApp] = initMiniApp();

  window.Telegram.WebApp.BackButton.show().onClick(async() => {
    let coins = -1;
    if(localStorage.getItem("coins") !== null) coins = Number(localStorage.getItem("coins"));
    let energy = -1;
    let lastEnergyAt;
    if(localStorage.getItem("energy") !== null){
      energy = Number(localStorage.getItem("energy"));
      lastEnergyAt = localStorage.getItem("lastEnergyDate");
    }
    let usd = -1;
    if(localStorage.getItem("usd") !== null) usd = Number(localStorage.getItem("usd"));
    let userTapCount = 0;
    if(localStorage.getItem("userTapCount") !== null) userTapCount = Number(localStorage.getItem("userTapCount"));
    localStorage.setItem("open", "true");
    localStorage.removeItem("coins");
    localStorage.removeItem("usd");
    localStorage.removeItem("energy");
    localStorage.removeItem("lastEnergyDate");
    localStorage.removeItem("userTapCount");

    // console.log(coins, usd, energy, lastEnergyAt);
    await logOut({currentEnergy: energy, amountOfUSD: usd, amountOfcoin:coins, lastEnergyAt, userTapCount});
    window.Telegram.WebApp.close();
  });

  useEffect(() => {
    // if(isDesktop) return;
    miniApp.setHeaderColor('#020921');
    miniApp.isVerticalSwipesEnabled = false;

    window.Telegram.WebApp.expand();

    window.Telegram.WebApp.disableVerticalSwipes();
  }, []);

  return (
    // !isDesktop?
    <Router>
      <Routes>
        <Route path="/">
          <Route path='/boost' element={<Boost />} />
          <Route path='/referals' element={<Referals />} />
          <Route path='/task' element={<Task />} />
          <Route index element={<Home />} />
          <Route path='/tapbot' element={<TapBot />}/>
          <Route path='/stats' element={<Stats />}/>
        </Route>
      </Routes>
    </Router>
    // :<Router><Routes><Route path='/' element={<BanPage />} /></Routes></Router>
  );
}

export default App;
