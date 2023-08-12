import {BrowserWindow} from "electron";
import {BidItem, interfaceType} from "../common/tpye";


export class BrowserController {
    static shared: BrowserController
    window: BrowserWindow

    constructor(window: BrowserWindow) {
        this.window = window
    }

    static init = (window: BrowserWindow) => {
        try {
            BrowserController.shared = new BrowserController(window)
        }catch (e){
            console.log(e)
        }
    }

    setItems = async (items: BidItem[]) =>{
        try {
            console.log("setItems")
            await this.window.webContents.send(interfaceType.setItem, items)
        }catch (e) {
            console.log("BrowserController setItems", e)
        }
    }
    setSaleIndex = async (index: number, isStart: boolean) =>{
        try {
            await this.window.webContents.executeJavaScript(`window.bid.setSaleIndex(${index}, ${isStart})`)
        }catch (e) {
            console.log("BrowserController setSaleIndex", e)
        }
    }
    setMessage = async (message: string) =>{
        try {
            console.log(message)
            message.replace("\'", "\"")
            await this.window.webContents.executeJavaScript(`window.bid.addMessage('${message}')`)
        }catch (e) {
            console.log("BrowserController setMessage", e)
        }

    }

}

