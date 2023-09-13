import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import { Bid } from "../pages/bid/Bid";
import {Display} from "../pages/bid/display/Display";
import {Chat} from "../pages/bid/chat/Chat";
import {Main} from "../pages/main/Main";
import {Products} from "../pages/products/Products";
import {BidProvider} from "../context/BidProvider";
import {CopyTextProvider} from "../context/CopyTextProvider";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                {/*재고*/}
                <Route path='/product' element={<Products />}/>
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
