import React, {createContext, ReactNode, useState} from "react";
import {setState} from "../common/tpye";

interface props {
    copyTextList: string[],
    setCopyTextList: setState<string[]>
}

const init: props = {
    copyTextList: [], setCopyTextList(value: ((prevState: string[]) => string[]) | string[]): void {
    }
}

export const CopyTextContext = createContext<props>(init)

export const CopyTextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [copyTextList, setCopyTextList] = useState<string[]>([])

    return (
        <CopyTextContext.Provider value={{
            copyTextList, setCopyTextList
        }}>
            {children}
        </CopyTextContext.Provider>
    )
}