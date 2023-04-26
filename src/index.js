import React from "react";
import { createRoot} from "react-dom/client";
import { HashRouter} from 'react-router-dom';


const App = () => {
    return (<h1>Hello World</h1>)
}
const Container = document.getElementById("root");

const root = createRoot(Container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);