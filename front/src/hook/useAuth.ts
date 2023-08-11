import {useContext} from "react";
import {BidContext} from "../context/BidProvider";
import API from "../model/API";
import {useAlert} from "./utils/useAlert";
import Storage from "../Utils/Storage";
import {useNavigate} from "react-router-dom";

export const useAuth = () =>{
    const context = useContext(BidContext)
    const {auth, setAuth} = context
    const {showAlert} = useAlert()

    const login = async (id: string) =>{
        const res = await API.shared.login(id)
        if(res.success) {
            if(res.data) {
                Storage.saveEbId(id)
                console.log(setAuth)
                console.log(BidContext)
                setAuth(true)
            }
            else {
                await showAlert("잘못된 아이디입니다.")
            }
        }
    }

    return {
        auth,
        setAuth,

        login
    }
}