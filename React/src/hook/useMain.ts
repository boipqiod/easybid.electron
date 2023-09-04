import {useEffect} from "react";
import {BidItem, interfaceType} from "../common/tpye";
import {useBid} from "./useBid";
import {useCopyText} from "./useCopyText";

export const useMain = () => {

    const {setBidItems,bidEnded} = useBid()
    const {copyTextList, appendText} = useCopyText()

    useEffect(()=>{
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data)=>{
            setBidItems(data)
        })

        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data)=>{
            setBidItems(data.items)
            bidEnded(data.index)
        })

    },[])

}
