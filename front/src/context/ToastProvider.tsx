import React, {createContext} from "react";

type props = {
    ToastList: string[]
}

const init: props = {
    ToastList: []
}

export const ToastContext = createContext<props>(init)

export const ToastProvider: React.FC = () =>{


    return (
        <></>
    )
}