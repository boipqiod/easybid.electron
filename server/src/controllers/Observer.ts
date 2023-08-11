import {BrowserWindow, contextBridge} from "electron";
import path from "path";

type chatListResponse = {
    lastChatId: string
    chatList: { message: number; name: string; }[];
}

export class Observer {
    static shared: Observer
    window: BrowserWindow

    lastChatId: string | undefined
    url = ""
    private messageList: string[] = []

    loadPage = async (url: string) =>{
        await this.window.loadURL(url)
    }

    constructor(window: BrowserWindow) {
        this.window = window

        setInterval(async ()=>{
            if(this.messageList.length === 0) return
            else await this.sendChat(this.messageList.shift() ?? "")
        }, 100)

    }

    static init = (window: BrowserWindow) => {
        try {
            Observer.shared = new Observer(window)
        }catch (e){
            console.log(e)
        }
    }

    getChat = async () => {
        try {
            const res = await this.window.webContents.executeJavaScript(`window.myAPI.getChat("${this.lastChatId}")`) as chatListResponse;
            this.lastChatId = res.lastChatId;
            return res.chatList;
        } catch (e) {
            console.error('Error while getting chat:', e);
            return [];
        }
    }

    sendMessage = (message: string) =>{
        this.messageList.push(message)
    }

    private sendChat = async (message: string) =>{
        try {
            await this.window.webContents.executeJavaScript(`window.myAPI.sendChat('${message}')`)
        } catch (e) {
            console.error('Error while sending chat:', e);
        }
    }

}

