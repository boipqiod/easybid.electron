import {ipcMain} from "electron";
import AuthService from "../service/AuthService";
import {APIResponse} from "../model/response";

export default class AuthRouter{
    static init = () =>{
        ipcMain.handle('/auth/login',  async (event, args)=>{
            const data = args as { id: string }
            const authResponse = await AuthService.shared.login(data.id)
            return APIResponse.getRes(true, authResponse)
        })
    }
}