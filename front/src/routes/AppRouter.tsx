import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { Main } from "../views/main/Main";
import {BidProvider} from "../context/BidProvider";
import {Display} from "../views/display/Display";
import {UserList} from "../views/display/UserList";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/display' element={<Display />}/>
                <Route path='/seller' element={<UserList />}/>
            </Routes>
        </BrowserRouter>
    )
} 