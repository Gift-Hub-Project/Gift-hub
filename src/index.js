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
import Checkout from "./components/checkout";
import OrderComplete from "./components/ordercomplete";
import Home from "./components/home";

const App = () => {
    const [ loginOut, setLoginOut ] = useState(window.localStorage.getItem("token"));
    const [ user, setUser ] = useState({});
    const [ usersCart, setUsersCart ] = useState(JSON.parse(window.localStorage.getItem("usersCart")) ||{id:1,updatedCart:[]}
    ); //for testng, want to be an empty object
    // const [usersCart, setUsersCart] = useState([])
    const [ token, setToken ] = useState(window.localStorage.getItem("token"));
    const [ filteredBaskets, setFilteredBaskets ] = useState(JSON.parse(window.localStorage.getItem("filteredBaskets")) || []);


    useEffect (()=>{
    //if user has cart in database, grab it. if not, create cart.
    //create/get cart logic
    },[token])
    
    useEffect(()=>{
      if(window.localStorage.getItem("token")) {
        const userData = getUser(window.localStorage.getItem("token"));
        setUser(userData);
      }
    },[]);

    useEffect(() => {
      window.localStorage.setItem("usersCart",JSON.stringify(usersCart));
    },[usersCart]);

    return (
      <div id="app">
        <Header loginOut = {loginOut} setLoginOut = {setLoginOut} />
        <Routes>
          <Route path ='/' element ={<Home />} />
          <Route path ='/occasions' element={<Occasions setFilteredBaskets = {setFilteredBaskets} />} /> 
          <Route path ='/register' element={<Register loginOut={loginOut} setLoginOut={setLoginOut} />} />
          <Route path ='occasions/baskets' element ={<Baskets filteredBaskets = {filteredBaskets} user = { user } token={token} setToken={setToken} setUsersCart={setUsersCart} usersCart={usersCart} />} />
          <Route path='/editbasket' element ={<EditBasket />} />
          <Route path ='/login' element={<Login loginOut={loginOut} setLoginOut={setLoginOut}/>} /> 
          <Route path ="/shoppingCart" element = {<ShoppingCart usersCart={usersCart} setUsersCart ={setUsersCart} />} />
          <Route path ='/checkout' element = {<Checkout />} />
          <Route path ='/ordercomplete' element ={<OrderComplete />} />
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