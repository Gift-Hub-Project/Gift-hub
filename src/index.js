import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/header.js";
import { getUser } from "./ajaxHelpers/users";
import Baskets from "./components/baskets";

const App = () => {
    const [ loginOut, setLoginOut ] = useState(window.localStorage.getItem("giftHub-token"));
    const [ user, setUser ] = useState({});

    useEffect(()=>{
      if(window.localStorage.getItem("token")) {
        const userData = getUser(window.localStorage.getItem("token"));
        setUser(userData);
      }
    },[])

    return (
      <div id="app">
      <Header loginOut = {loginOut} setLoginOut = {setLoginOut} />
       <Login loginOut = {loginOut} setLoginOut = {setLoginOut} />
       <Baskets user ={ user } />
      </div>
    )
};


const Container = document.getElementById("root");
const root = createRoot(Container);

root.render(
   
    <HashRouter>
        <App />
    </HashRouter>
);