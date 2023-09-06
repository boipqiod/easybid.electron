import {useContext, useEffect} from "react";
import {CopyTextContext} from "../context/CopyTextProvider";
import {useAlert} from "./utils/useAlert";
import {ElectronAPI} from "../model/ElectronAPI";
import {interfaceType} from "../utils/tpye";

export const useCopyText = () =>{
    const context = useContext(CopyTextContext)
    const {copyTextList, addCopyTextList, removeTextList, removeTextListAll} = context
    const {showAlert, showConfirm} = useAlert()

    useEffect(()=>{
        window.bid.setObserver<string>(interfaceType.message, (data)=>{
            appendText(data)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[copyTextList])

    const appendText = (text: string) =>{
        addCopyTextList(text)
    }

    const removeText = (index: number) =>{
        removeTextList(index)
    }

    const removeAllText = async () =>{
        const isRemove = await showConfirm("모든 텍스트를 삭제하시겠습니까?")
        if(isRemove) removeTextListAll()
    }

    const copyText = async (index: number)=>{
        const text = copyTextList[index]
        try {
            await window.navigator.clipboard.writeText(text)
            await showAlert("복사되었습니다.")
        }catch (e){
            await showAlert("지원하지 않는 기능입니다.")
        }

    }

    const sendMessage = async (index: number) =>{
        const isSend = await showConfirm("메세지를 보내시겠습니까?")
        if (!isSend) return
        const text = copyTextList[index]
        await ElectronAPI.instance.sendMessage(text)
    }


    return {
        copyTextList, addCopyTextList,
        appendText,
        removeText,
        removeAllText,
        copyText,
        sendMessage
    }
}
