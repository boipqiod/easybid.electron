import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {BidHeader} from './components/BidHeader';
import {BidTable} from "./components/Table/BidTable";
import {BidModifyModal} from "./components/Modals/BidModifyModal";
import {BidAddClientModal} from "./components/Modals/BidAddClientModal";
import {BidFooter} from "./components/BidFooter";
import {BidDisplay} from "./components/BidDisplay";
import {Stack} from "react-bootstrap";
import {BidAddProductModal} from "./components/Modals/BidAddProductModal";
import {useBidMainPage} from "../../hook/Bid/useBidMainPage";

export const Bid = () => {

    const {fileName, url, isAddProduct, modifyIndex, addClientIndex} = useBidMainPage()

    return (
        <>
            { modifyIndex !== -1 && <BidModifyModal/> }
            { isAddProduct && <BidAddProductModal/> }
            { addClientIndex !== -1 && <BidAddClientModal/> }

            <Stack
                style={{maxWidth: "720px"}}
                className={`text-center mx-auto`}>
                <BidHeader/>
                {
                    fileName && fileName !== "" && url && url !== "" &&
                    <Stack gap={4}>
                        <BidDisplay/>
                        <BidTable/>
                        <BidFooter/>
                    </Stack>
                }
            </Stack>
        </>
    )
}
