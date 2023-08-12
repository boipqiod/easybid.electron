import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {MainHeader} from './components/MainHeader';
import {MainAdder} from './components/MainAdder';
import {MainTable} from "./components/Table/MainTable";
import {MainModifyModal} from "./components/Modals/MainModifyModal";
import {useBid} from "../../hook/useBid";
import Storage from "../../Utils/Storage";
import {MainAddClientModal} from "./components/Modals/MainAddClientModal";
import {MainFooter} from "./components/MainFooter";
import {BidItem, interfaceType} from "../../common/tpye";
import {MainText} from "./components/Text/MainText";
import {useCopyText} from "../../hook/useCopyText";

export const Main: React.FC = () => {
    const {modifyIndex, addClientIndex, setBidItems, bidEnded} = useBid()
    const {copyTextList, appendText} = useCopyText()
    const fileName = Storage.getFileName()
    const url = Storage.getYoutubeUrl()

    useEffect(()=>{
        // @ts-ignore
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data)=>{
            setBidItems(data)
        })

        // @ts-ignore
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data)=>{
            setBidItems(data.items)
            bidEnded(data.index)
        })

        // @ts-ignore
        window.bid.setObserver<string>(interfaceType.message, (data)=>{
            appendText(data)
        })
    },[])

    useEffect(()=>{
        // @ts-ignore
        window.bid.setObserver<string>(interfaceType.message, (data)=>{
            appendText(data)
        })
    },[copyTextList])


    return (
        <div className="container d-flex flex-column align-items-center vw-100">
            <div style={{width: "800px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                <MainHeader/>

                {
                    fileName && fileName !== "" && url && url !== "" &&
                    <>
                        <MainAdder/>
                        <MainTable/>
                        <MainText />
                        <MainFooter/>
                    </>
                }
            </div>

            {
                modifyIndex !== -1 &&
                <MainModifyModal />
            }

            {
                addClientIndex !== -1 &&
                <MainAddClientModal />
            }

        </div>
    )

}