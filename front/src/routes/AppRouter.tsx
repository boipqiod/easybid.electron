import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { Main } from "../views/main/Main";
import {Display} from "../views/display/Display";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/display' element={<Display />}/>
            </Routes>
        </BrowserRouter>
    )
} 