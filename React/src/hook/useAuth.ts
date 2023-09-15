import {useContext} from "react";
import {useAlert} from "./utils/useAlert";
import StorageUtil from "../utils/StorageUtil";
import {AuthContext} from "../context/AuthProvider";
import AuthService from "../service/AuthService";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {auth, setAuth, ebId, setEbId} = context
    const {showAlert} = useAlert()

    const login = async (id: string, passkey: string) =>{
        const res = await AuthService.login(id, passkey)
        if(res.success && res.data){
            StorageUtil.saveEbId(id)
            setEbId(id)
            setAuth(true)
        }else {
            await showAlert("아이디 혹은 비밀번호를 확인해주세요.")
        }
    }

    return {
        auth,
        setAuth,
        ebId,
        login
    }
}