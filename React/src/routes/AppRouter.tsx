import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { Bid } from "../pages/Bid/Bid";
import {Display} from "../pages/Display/Display";
import {Chat} from "../pages/Chat/Chat";
import {Main} from "../pages/Main/Main";
import {Products} from "../pages/Product/Products";
import {BidProvider} from "../context/BidProvider";
import {CopyTextProvider} from "../context/CopyTextProvider";
import {User} from "../pages/User/User";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                {/*재고*/}
                <Route path='/product' element={<Products />}/>
                {/*회원관리*/}
                <Route path='/user' element={<User />}/>
                {/*경매*/}
                <Route path='bid/*' element={<BidRoutesWrapper />}/>
            </Routes>
        </BrowserRouter>
    )
}

const BidRoutesWrapper = () => {

    return (
        <BidProvider>
            <CopyTextProvider>
                <Routes>
                    <Route path='/' element={<Bid />}/>
                    <Route path='/display' element={<Display />}/>
                    <Route path='/chat' element={<Chat />}/>
                </Routes>
            </CopyTextProvider>
        </BidProvider>
    );
}
