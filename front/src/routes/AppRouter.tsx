import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom"
import { Main } from "../views/main/Main";
import {Display} from "../views/display/Display";

export const AppRouter: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/display' element={<Display />}/>
            </Routes>
        </HashRouter>
    )
} 