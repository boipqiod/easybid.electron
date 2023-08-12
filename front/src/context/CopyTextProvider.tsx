import React, {createContext, ReactNode, useEffect, useState} from "react";
import {setState} from "../common/tpye";
import Storage from "../Utils/Storage";

interface props {
    copyTextList: string[],
    addCopyTextList: (value: string) => void
    removeTextList: (index: number) => void
}

const init: props = {
    addCopyTextList(value: string): void {
    }, copyTextList: [], removeTextList(index: number): void {
    }
}

export const CopyTextContext = createContext<props>(init)

export const CopyTextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [copyTextList, setCopyTextList] = useState<string[]>([]);

    useEffect(()=>{
        const textList = Storage.getTextList()
        console.log(textList)
        setCopyTextList(textList)
    },[])

    const addCopyTextList = (value: string) => {
        setCopyTextList(prevList => [...prevList, value]);
    };

    const removeTextList = (index: number) => {
        const list = copyTextList.splice(index, 1)
        console.log(list)
        Storage.saveTextList(copyTextList.splice(index, 1))
        setCopyTextList(copyTextList.splice(index, 1));
    };

    return (
        <CopyTextContext.Provider value={{
            copyTextList, addCopyTextList, removeTextList
        }}>
            {children}
        </CopyTextContext.Provider>
    )
}