import {ipcMain} from "electron";
import AuthService from "../service/AuthService";
import {APIResponse} from "../model/response";
import EncryptUtil from "../utils/EncryptUtil";
import UserController from "../common/UserController";

export default class AuthRouter{
    static init = () =>{
        ipcMain.handle('/auth/login',  async (event, args)=>{
            const data = args as { id: string, passkey: string }
            const passkey = EncryptUtil.sha256(`${data.id}1573${data.passkey}`).toUpperCase()

            const authResponse = await AuthService.shared.login(data.id, passkey)

            if(authResponse){
                UserController.instance.login(data.id)
                return APIResponse.getRes<{token: string}>(authResponse)
            }else{
                return APIResponse.getRes(authResponse)
            }
        })

        ipcMain.handle('/auth/isLogin',  async (event, args)=>{
            const isLogin = UserController.instance.isLogin
            return APIResponse.getRes(isLogin)
        })
    }
}