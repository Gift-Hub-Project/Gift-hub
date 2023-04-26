import React from "react";
import { createRoot} from "react-dom/client";
import { HashRouter, Routes, Route} from 'react-router-dom';
import AllOccasions from './occasions';


const Container = document.getElementById("root");

const root = createRoot(Container);
const App = () => {
    return (
     <Routes>
        <Route path='/occasions' element={<AllOccasions />}/>
     </Routes>
    )
}
root.render(
   
    <HashRouter>
        <App />
    </HashRouter>
);