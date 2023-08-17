import {BrowserWindow} from "electron";

type chatListResponse = {
    lastChatId: string
    chatList: { message: number; name: string; }[];
}

export class ChatController {
    static shared: ChatController
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
            else await this._sendChat(this.messageList.shift() ?? "")
        }, 1)

    }

    static init = (window: BrowserWindow) => {
        try {
            ChatController.shared = new ChatController(window)
        }catch (e){
            console.log(e)
        }
    }

    getChat = async () => {
        try {
            const res = await this.window.webContents.executeJavaScript(`window.myAPI.getChat("${this.lastChatId}")`) as chatListResponse;
            if(res.lastChatId) this.lastChatId = res.lastChatId;
            return res.chatList;
        } catch (e) {
            console.error('Error while getting chat:', e);
            return [];
        }
    }
    sendChat = (message: string) =>{
        if(this.messageList.length === 0) this.setTimer()
        this.messageList.push(message)
    }
    setTimer = () =>{
        this.timer = setInterval(async ()=>{
            if(this.messageList.length === 0) {
                clearInterval(this.timer)
                return
            }
            else await this._sendChat(this.messageList.shift() ?? "")
        }, 50)
    }

    private _sendChat = async (message: string) =>{
        try {
            await this.window.webContents.executeJavaScript(`window.myAPI.sendChat('${message}')`)
        } catch (e) {
            console.error('Error while sending chat:', e);
        }
    }

}

