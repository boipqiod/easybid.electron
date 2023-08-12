import React, {createContext, ReactNode, useEffect, useState} from "react";
import Storage from "../Utils/Storage";

interface props {
    copyTextList: string[],
    addCopyTextList: (value: string) => void
    removeTextList: (index: number) => void
}

const init: props = {
    addCopyTextList(_value: string): void {
    }, copyTextList: [], removeTextList(_index: number): void {
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
        setCopyTextList([...copyTextList, value]);
        Storage.saveTextList([...copyTextList, value])
    };

    const removeTextList = (index: number) => {
        if(copyTextList.length === 1) {
            setCopyTextList([])
            Storage.saveTextList([])
            return
        }
        let list = [...copyTextList]
        list.splice(index, 1)
        console.log(list)
        Storage.saveTextList(list)
        setCopyTextList(list)
    };

    return (
        <CopyTextContext.Provider value={{
            copyTextList, addCopyTextList, removeTextList
        }}>
            {children}
        </CopyTextContext.Provider>
    )
}