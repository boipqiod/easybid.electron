import {BrowserWindow, ipcMain} from "electron";
import {BidItem, interfaceType} from "../common/tpye";
import {ChatController} from "./ChatController";


export class BrowserController {
    static shared: BrowserController
    windows: BrowserWindow[] = []

    constructor(window: BrowserWindow) {
        this.windows.push(window)
    }

    static init = (window: BrowserWindow) => {
        try {
            BrowserController.shared = new BrowserController(window)
            ipcMain.handle('sendData', (event, args)=>{
                const data = args as { url: string, data: string }
                ChatController.shared.sendChat(data.data)
                return
            })

        } catch (e) {
            console.log(e)
        }
    }

    pushWindow = (window: BrowserWindow) => {
        this.windows.push(window)
    }

    removeWindow = (index: number) => {
        this.windows[index].close()
        this.closedWindow(index)
    }

    closedWindow = (index: number) => {
        this.windows.splice(index, 1)
    }

    removeAll = () => {
        this.windows.forEach((value, index) => {
            if (index !== 0) value.close();
        });
    }

    setItems = async (items: BidItem[]) => {
        try {
            this.windows.forEach(window => {
                window.webContents.send(interfaceType.setItem, items)
            })
        } catch (e) {
            console.log("BrowserController setItems", e)
        }
    }

    endBid = async (index: number, items: BidItem[]) => {
        try {
            this.windows.forEach(window => {
                window.webContents.send(interfaceType.endBid, {items, index})
            })
        } catch (e) {
            console.log("BrowserController setItems", e)
        }
    }

    startBid = async (index: number, items: BidItem[]) => {
        try {
            this.windows.forEach(window => {
                window.webContents.send(interfaceType.startBid, {items, index})
            })
        } catch (e) {
            console.log("BrowserController setItems", e)
        }
    }
    setMessage = async (message: string) => {
        try {
            this.windows.forEach(window => {
                window.webContents.send(interfaceType.message, message)
            })
        } catch (e) {
            console.log("BrowserController setItems", e)
        }
    }

}

