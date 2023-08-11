import {useContext} from "react";
import {CopyTextContext} from "../context/CopyTextProvider";
import {useNavigate} from "react-router-dom";
import {useAlert} from "./utils/useAlert";

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

    return {
        copyTextList, addCopyTextList,
        appendText,
        removeText,
        copyText
    }
}