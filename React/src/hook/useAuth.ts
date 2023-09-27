import React, {useContext, useState} from "react";
import {useAlert} from "./utils/useAlert";
import StorageUtil from "../utils/StorageUtil";
import {AuthContext} from "../context/AuthProvider";
import AuthService from "../service/AuthService";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {setAuth, ebId, setEbId} = context
    const {showAlert} = useAlert()

    const [form, setForm] = useState<{ id: string, passkey: string }>({
        id: "",
        passkey: ""
    })

    const login = async (id: string, passkey: string) => {
        const res = await AuthService.login(id, passkey)
        if (res.success) {
            StorageUtil.saveEbId(id)
            setEbId(id)
            setAuth(true)
        } else {
            await showAlert("아이디 혹은 비밀번호를 확인해주세요.")
        }
    }

    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handelLogin = async () => {
        if (form.id === "" || form.passkey === "") alert("아이디와 비밀번호를 입력해주세요.")
        else await login(form.id, form.passkey)
    }
    const handelEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") await handelLogin()
    }

    return {
        ebId,
        handelEnter, handelChange, handelLogin
    }
}