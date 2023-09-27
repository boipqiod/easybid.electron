import StorageUtil from "../../utils/StorageUtil";
import {useCopyText} from "../useCopyText";
import {useEffect} from "react";
import BidService from "../../service/BidService";
import {BidItem, interfaceType} from "../../utils/tpye";
import {useBid} from "../common/useBid";

export const useBidMainPage = () => {
    const fileName = StorageUtil.getFileName()
    const url = StorageUtil.getYoutubeUrl()
    const {appendText, setCopyTextList} = useCopyText()

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

    }, [bidEnded, bidItems, setBidItems])


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

    }, [appendText, setCopyTextList])

    return{
        fileName, url,
        modifyIndex, isAddProduct, addClientIndex
    }
}