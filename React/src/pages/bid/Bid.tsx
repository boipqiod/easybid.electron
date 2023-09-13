import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {BidHeader} from './components/BidHeader';
import {BidTable} from "./components/Table/BidTable";
import {BidModifyModal} from "./components/Modals/BidModifyModal";
import {useBid} from "../../hook/useBid";
import StorageUtil from "../../utils/StorageUtil";
import {BidAddClientModal} from "./components/Modals/BidAddClientModal";
import {BidFooter} from "./components/BidFooter";
import {BidDisplay} from "./components/BidDisplay";
import {Stack} from "react-bootstrap";
import {BidAddProductModal} from "./components/Modals/BidAddProductModal";
import {BidItem, interfaceType} from "../../utils/tpye";
import {useCopyText} from "../../hook/useCopyText";
import BidService from "../../service/BidService";

export const Bid = () => {
    const fileName = StorageUtil.getFileName()
    const url = StorageUtil.getYoutubeUrl()
    const {appendText, copyTextList, setCopyTextList} = useCopyText()

    const {bidItems, setBidItems, bidEnded, modifyIndex, isAddProduct, addClientIndex} = useBid()

    useEffect(() => {

        const fileName = StorageUtil.getFileName()
        const id = StorageUtil.getEbId()
        const youtubeUrl = StorageUtil.getYoutubeUrl()
        if (fileName && fileName !== "" &&
            youtubeUrl && youtubeUrl !== "") {
            BidService.init(id, fileName, youtubeUrl).then().catch(
                (e) => {
                    console.log(e)
                }
            )
        }
    }, [])

    useEffect(() => {
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data) => {
            setBidItems(data)
        })
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data) => {
            setBidItems(data.items)
            bidEnded(data.index)
        })

        //eslint-disable-next-line
    }, [bidItems])


    useEffect(() => {
        window.bid.setObserver<string>(interfaceType.message, (data) => {
            appendText(data)
        })

        window.addEventListener('storage', (e: StorageEvent) => {
            if (e.key === "copy") {
                const list = JSON.parse(e.newValue || "[]")
                setCopyTextList(list)
            }
        })
        return () => {
            document.removeEventListener('storage', () => {
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copyTextList])


    return (
        <>
            {
                modifyIndex !== -1 &&
                <BidModifyModal/>
            }
            {
                isAddProduct &&
                <BidAddProductModal/>
            }
            {
                addClientIndex !== -1 &&
                <BidAddClientModal/>
            }

            <div className="container d-flex flex-column align-items-center vw-100">
                <div style={{width: "720px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                    <BidHeader/>
                    {
                        fileName && fileName !== "" && url && url !== "" &&
                        <Stack gap={4}>
                            <BidDisplay/>
                            <BidTable/>
                            <BidFooter/>
                        </Stack>
                    }
                </div>
            </div>
        </>
    )

}
