import {useContext} from "react";
import {CopyTextContext} from "../context/CopyTextProvider";
import {useAlert} from "./utils/useAlert";
import {ElectronAPI} from "../model/ElectronAPI";

export const useCopyText = () =>{
    const context = useContext(CopyTextContext)
    const {copyTextList, addCopyTextList, removeTextList} = context
    const {showAlert} = useAlert()

    const appendText = (text: string) =>{
        addCopyTextList(text)
    }

    const removeText = (index: number) =>{
        removeTextList(index)
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

    const sendMessage = (index: number) =>{
        const text = copyTextList[index]
        ElectronAPI.instance.request<string>("/message", text)
    }


    return {
        copyTextList, addCopyTextList,
        appendText,
        removeText,
        copyText,
        sendMessage
    }
}