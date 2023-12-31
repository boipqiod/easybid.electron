import React, { createContext, ReactNode, useEffect, useState } from "react";
import StorageUtil from "../utils/StorageUtil";

interface props {
    copyTextList: string[],
    setCopyTextList: (value: string[]) => void
    addCopyTextList: (value: string) => void
    removeTextList: (index: number) => void
    removeTextListAll: () => void
}

const init: props = {
    addCopyTextList(_value: string): void {
    }, copyTextList: [], removeTextList(_index: number): void {
    },
    setCopyTextList(_value: string[]): void {
    }
    , removeTextListAll(): void {}
}

export const CopyTextContext = createContext<props>(init)

export const CopyTextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [copyTextList, setCopyTextList] = useState<string[]>([]);

    useEffect(() => {
        const textList = StorageUtil.getTextList()
        console.log(textList)
        setCopyTextList(textList)
    }, [])

    const addCopyTextList = (value: string) => {
        const list = [...copyTextList.reverse(), value].reverse()
        setCopyTextList(list);
        StorageUtil.saveTextList(list)
    };

    const removeTextList = (index: number) => {
        if (copyTextList.length === 1) {
            setCopyTextList([])
            StorageUtil.saveTextList([])
            return
        }
        let list = [...copyTextList]
        list.splice(index, 1)
        console.log(list, index)
        StorageUtil.saveTextList(list)
        setCopyTextList(list)
    };

    const removeTextListAll = () => {
        setCopyTextList([])
        StorageUtil.saveTextList([])
    }

    return (
        <CopyTextContext.Provider value={{
            copyTextList, setCopyTextList,
            addCopyTextList,
            removeTextList,
            removeTextListAll
        }}>
            {children}
        </CopyTextContext.Provider>
    )
}