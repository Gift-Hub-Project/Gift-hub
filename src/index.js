import React,{ useState } from "react";
import { createRoot} from "react-dom/client";
import { HashRouter} from 'react-router-dom';
import Header from "./components/header.js";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('giftHub-token'));
    
    return (
        <>
         <Header isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} /> 
         </>
    );
};

const Container = document.getElementById("root");

const root = createRoot(Container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);