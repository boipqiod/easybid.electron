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
    private timer: NodeJS.Timer | undefined

    loadPage = async (url: string) =>{
        await this.window.loadURL(url)
        await this.getChat()
    }

    constructor(window: BrowserWindow) {
        this.window = window
        this.setTimer()
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
            const res = await this.window.webContents.executeJavaScript(`window.youtube.getChat("${this.lastChatId}")`) as chatListResponse;
            console.log(res)
            if(res.lastChatId) this.lastChatId = res.lastChatId;
            return res.chatList;
        } catch (e) {
            console.error('Error while getting chat:', e);
            return [];
        }
    }
    sendChat = (message: string) =>{
        this.messageList.push(message)
    }
    setTimer = () =>{
        this.timer = setInterval(async ()=>{
            const msg = this.messageList.shift()
            if(msg) await this._sendChat(msg)
        }, 500)
    }

    private _sendChat = async (message: string) =>{
        try {
            await this.window.webContents.executeJavaScript(`window.youtube.sendChat('${message}')`)
        } catch (e) {
            console.error('Error while sending chat:', e);
        }
    }

}

