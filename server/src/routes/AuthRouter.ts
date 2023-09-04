import {ipcMain} from "electron";
import AuthService from "../service/AuthService";
import {APIResponse} from "../model/response";
import EncryptUtil from "../common/EncryptUtil";

export default class AuthRouter{
    static init = () =>{
        ipcMain.handle('/auth/login',  async (event, args)=>{
            const data = args as { id: string, passkey: string }
            const passkey = EncryptUtil.sha256(`${data.id}1573${data.passkey}`).toUpperCase()

            const authResponse = await AuthService.shared.login(data.id, passkey)

            if(authResponse){
                const token = EncryptUtil.createJWT(data.id, data.passkey)
                return APIResponse.getRes<{token: string}>(authResponse, {token})
            }else{
                return APIResponse.getRes(authResponse)
            }

        })
    }
}