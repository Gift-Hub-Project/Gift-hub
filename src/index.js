import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/header.js";
import { getUser } from "./ajaxHelpers/users";
import Baskets from "./components/baskets";
import EditBasket from "./components/editBasket";
import Occasions from "./components/occasions";
import ShoppingCart from "./components/shoppingcart";

const App = () => {
    const [ loginOut, setLoginOut ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState({});
    const [ usersCart, setUsersCart ] = useState({id:1}); //for testng, want to be an empty object
    // const [usersCart, setUsersCart] = useState([])
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));


    useEffect(()=>{
      if(window.localStorage.getItem("token")) {
        const userData = getUser(window.localStorage.getItem("token"));
        setUser(userData);
      }
    },[])

    return (
      <div id="app">
        <Header loginOut = {loginOut} setLoginOut = {setLoginOut} />
        <Routes>
          <Route path ='/' element={<Occasions />} /> 
          <Route path ='/register' element={<Register loginOut={loginOut} setLoginOut={setLoginOut} />} />
          <Route path ='/baskets' element ={<Baskets user = { user } token={token} setToken={setToken} setUsersCart={setUsersCart} usersCart={usersCart} />} />
          <Route path='/editbasket' element ={<EditBasket />} />
          <Route path ='/login' element={<Login loginOut={loginOut} setLoginOut={setLoginOut}/>} /> 
          <Route path ="/shoppingCart" element = {<ShoppingCart usersCart={usersCart} setUsersCart ={setUsersCart} />} />

        </Routes>
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