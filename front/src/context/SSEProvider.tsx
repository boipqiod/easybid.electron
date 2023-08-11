import React, {createContext, ReactNode, useEffect, useRef, useState} from "react";
import {setState} from "../common/tpye";


interface prop{
}

export const SSEContext = createContext<prop | undefined>(undefined)

export const SSEProvider: React.FC<{children: ReactNode}> = ({children}) =>{

    return (
        <SSEContext.Provider value={{
        }}>
            {children}
        </SSEContext.Provider>
    )
}