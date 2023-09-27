import {useContext} from "react";
import {CopyTextContext} from "../context/CopyTextProvider";
import {useAlert} from "./utils/useAlert";
import BidService from "../service/BidService";
import {toast} from "react-toastify";

export const useCopyText = () =>{
    const context = useContext(CopyTextContext)
    const {copyTextList, addCopyTextList, removeTextList, removeTextListAll, setCopyTextList} = context
    const {showConfirm} = useAlert()

    const appendText = (text: string) =>{
        addCopyTextList(text)
    }

    const removeText = (index: number) =>{
        removeTextList(index)
        toast.success("삭제되었습니다.")
    }

    const removeAllText = async () =>{
        const isRemove = await showConfirm("모든 텍스트를 삭제하시겠습니까?")
        if(isRemove) {
            removeTextListAll()
            toast.success("모든 텍스트가 삭제되었습니다.")
        }
    }

    const copyText = async (index: number)=>{
        const text = copyTextList[index]
        try {
            await window.navigator.clipboard.writeText(text)
            toast.success("복사되었습니다.")
        }catch (e){
            toast.error("지원하지 않는 기능입니다.")
        }

    }

    const sendMessage = async (index: number) =>{
        const isSend = await showConfirm("메세지를 보내시겠습니까?")
        if (!isSend) return
        const text = copyTextList[index]
        await BidService.sendMessage(text)
        toast.success("전송되었습니다.")
    }


    return {
        copyTextList, setCopyTextList,
        addCopyTextList,
        appendText,
        removeText,
        removeAllText,
        copyText,
        sendMessage
    }
}
