
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/header.js";

const App = () => {
    const [loginOut, setLoginOut] = useState(window.localStorage.getItem('giftHub-token'));
    
    return (
        <>
         <Header loginOut = {loginOut} setLoginOut = {setLoginOut} /> 
         <Login />
         <Register />
         </>
    );
};

// const App = () => {

//   const [ loginOut, setLoginOut ] = useState("");

//     return (
//       <div id="app">
//         <Login />
//         <Register />

//         {/* <Routes>
//           <Route path="/login" element={<Login setLoginOut={setLoginOut}/>} />
//           <Route path='/register' element={<Register setLoginOut={setLoginOut} />} />

//         </Routes> */}

//       </div>
//     )
// };

const Container = document.getElementById("root");
const root = createRoot(Container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);