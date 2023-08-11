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
    private timer: NodeJS.Timer

    loadPage = async (url: string) =>{
        await this.window.loadURL(url)
        await this.getChat()
    }

    constructor(window: BrowserWindow) {
        this.window = window

        this.timer = setInterval(async ()=>{
            if(this.messageList.length === 0) {
                clearInterval(this.timer)
                return
            }
            else await this.sendChat(this.messageList.shift() ?? "")
        }, 1)

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
        if(this.messageList.length === 0) this.setTimer()
        this.messageList.push(message)

    }

    setTimer = () =>{
        this.timer = setInterval(async ()=>{
            if(this.messageList.length === 0) {
                clearInterval(this.timer)
                return
            }
            else await this.sendChat(this.messageList.shift() ?? "")
        }, 1)
    }

    private sendChat = async (message: string) =>{
        try {
            await this.window.webContents.executeJavaScript(`window.myAPI.sendChat('${message}')`)
        } catch (e) {
            console.error('Error while sending chat:', e);
        }
    }

}

