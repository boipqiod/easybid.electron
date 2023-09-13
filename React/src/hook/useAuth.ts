import {useContext} from "react";
import {useAlert} from "./utils/useAlert";
import StorageUtil from "../utils/StorageUtil";
import {ElectronAPI} from "../model/ElectronAPI";
import {AuthContext} from "../context/AuthProvider";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {auth, setAuth, ebId, setEbId} = context
    const {showAlert} = useAlert()

    const login = async (id: string, passkey: string) =>{
        const res = await ElectronAPI.instance.login(id, passkey)
        if(res.success && res.data){
            StorageUtil.saveEbId(id)
            setEbId(id)
            setAuth(true)
        }else {
            await showAlert("잘못된 아이디입니다.")
        }
    }

    return {
        auth,
        setAuth,
        ebId,
        login
    }
}