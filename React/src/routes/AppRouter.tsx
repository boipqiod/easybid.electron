import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { Main } from "../views/main/Main";
import {Display} from "../views/display/Display";
import {Chat} from "../views/chat/Chat";

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