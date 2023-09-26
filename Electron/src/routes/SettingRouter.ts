import {ipcMain} from "electron";

export class SettingRouter{
    init = () =>{
        //상품 추가 시 자동으로 메시지 발송 여부
        ipcMain.handle('/setting/setAutoSendByAdded', async (event, args)=>{

        })
    }
}