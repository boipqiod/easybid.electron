import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {MainHeader} from './components/MainHeader';
import {MainAdder} from './components/MainAdder';
import {MainTable} from "./components/Table/MainTable";
import {MainModifyModal} from "./components/Modals/MainModifyModal";
import {useBid} from "../../hook/useBid";
import StorageUtil from "../../utils/StorageUtil";
import {MainAddClientModal} from "./components/Modals/MainAddClientModal";
import {MainFooter} from "./components/MainFooter";
import {MainDisplay} from "./components/MainDisplay";
import {Stack} from "react-bootstrap";
import {MainAddProductModal} from "./components/Modals/MainAddProductModal";
import {BidItem, interfaceType} from "../../utils/tpye";
import {useCopyText} from "../../hook/useCopyText";

export const Main: React.FC = () => {
    const fileName = StorageUtil.getFileName()
    const url = StorageUtil.getYoutubeUrl()
    const {appendText, copyTextList, setCopyTextList} = useCopyText()

    const {bidItems, setBidItems,bidEnded, modifyIndex} = useBid()
    useEffect(()=>{
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data)=>{
            setBidItems(data)
        })
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data)=>{
            setBidItems(data.items)
            bidEnded(data.index)
        })

        //eslint-disable-next-line
    },[bidItems])


    useEffect(()=>{
        window.bid.setObserver<string>(interfaceType.message, (data)=>{
            appendText(data)
        })

        window.addEventListener('storage', (e:StorageEvent) => {
            if(e.key === "copy"){
                const list = JSON.parse(e.newValue || "[]")
                setCopyTextList(list)
            }
        })
        return () => {
            document.removeEventListener('storage', ()=>{})
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[copyTextList])


    return (

        <>
            {
                modifyIndex !== -1 &&
                <MainModifyModal/>
            }
            <MainAddProductModal />
            <MainAddClientModal />
            <div className="container d-flex flex-column align-items-center vw-100">
                <div style={{width: "800px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                    <MainHeader/>
                    {
                        fileName && fileName !== "" && url && url !== "" &&
                        <Stack gap={4}>
                            <MainDisplay />
                            {/*<MainAdder/>*/}
                            <MainTable/>
                            {/*<MainText />*/}
                            <MainFooter/>
                        </Stack>
                    }
                </div>
            </div>
        </>

    )

}
