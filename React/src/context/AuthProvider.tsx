import React, {createContext, useEffect, useState} from 'react';
import {Auth} from "../pages/auth/Auth";

type props = {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
    ebId: string,
    setEbId: React.Dispatch<React.SetStateAction<string>>
}

const init: props = {
    auth: false, ebId: "", setAuth(value: ((prevState: boolean) => boolean) | boolean): void {
    }, setEbId(value: ((prevState: string) => string) | string): void {
    }
}

export const AuthContext = createContext<props>(init)

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    //로그인 여부
    const [auth, setAuth] = useState<boolean>(false)
    //아이디
    const [ebId, setEbId] = useState<string>("")

    useEffect(() => {
        const id = localStorage.getItem("ebId")
        console.log(window.location.href)
        if (id && window.location.href.includes("/bid")) {
            console.log("로그인")
            setAuth(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            auth, setAuth,
            ebId, setEbId
        }}>
            { auth ? children : <Auth /> }
        </AuthContext.Provider>
    )
}