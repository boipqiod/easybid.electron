import {useContext} from "react";
import {BidContext} from "../context/BidProvider";
import {useAlert} from "./utils/useAlert";
import StorageUtil from "../utils/StorageUtil";
import {ElectronAPI} from "../model/ElectronAPI";

export const useAuth = () =>{
    const context = useContext(BidContext)
    const {auth, setAuth, setEbId} = context
    const {showAlert} = useAlert()

    const login = async (id: string, passkey: string) =>{
        const res = await ElectronAPI.instance.login(id, passkey)
        if(res.success && res.data){
            StorageUtil.saveToken(res.data?.token)
            setEbId(id)
            setAuth(true)

            const fileName = StorageUtil.getFileName()
            const youtubeUrl = StorageUtil.getYoutubeUrl()

            console.log(fileName, youtubeUrl)


            if(fileName && fileName !== "" &&
                youtubeUrl && youtubeUrl !== ""){
                await ElectronAPI.instance.init(id, fileName, youtubeUrl)
                return
            }


        }else {
            await showAlert("잘못된 아이디입니다.")
        }
    }

    return {
        auth,
        setAuth,

        login
    }
}