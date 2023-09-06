import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { Main } from "../pages/main/Main";
import {Display} from "../pages/display/Display";
import {Chat} from "../pages/chat/Chat";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/display' element={<Display />}/>
                <Route path='/chat' element={<Chat />}/>
            </Routes>
        </BrowserRouter>
    )
} 