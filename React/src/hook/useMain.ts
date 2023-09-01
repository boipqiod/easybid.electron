import {useEffect} from "react";
import {BidItem, interfaceType} from "../common/tpye";
import {useBid} from "./useBid";
import {useCopyText} from "./useCopyText";

export const useMain = () => {

    const {setBidItems,bidEnded} = useBid()
    const {copyTextList, appendText} = useCopyText()

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

}
