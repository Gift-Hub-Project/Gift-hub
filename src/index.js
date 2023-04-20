import React from "react";
import { createRoot} from "react-dom/client";
import { HashRouter} from 'react-router-dom';


const Container = document.getElementById("root");

const root = createRoot(Container);
const App = () => {
    return (<h1>Hello World</h1>)
}
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);