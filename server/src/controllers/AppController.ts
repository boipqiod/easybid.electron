import {app, BrowserWindow} from "electron";
import path from "path";
import {BrowserController} from "./BrowserController";
import {ChatController} from "./ChatController";

export default class ElectronRouter {
    static init = async () => {
        await ElectronRouter.checkGoogleLogin()
        await ElectronRouter.startEasyBid()
    }

    private static startEasyBid = async () => {
        await ElectronRouter.init()

        const mainWindow = new BrowserWindow({
            width: 850,
            height: 1080,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: true,
                preload: path.join(__dirname, 'src', 'preload', 'front.preload.js')
            }
        })
        const backWindow = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'src', 'preload', 'youtube.preload.js')
            }
        })
        await mainWindow.loadURL(`file://${path.join(__dirname, 'src/views/index.html')}`);

        mainWindow.webContents.setWindowOpenHandler(({url}) => {
            const win = new BrowserWindow({
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    preload: path.join(__dirname, 'src', 'preload', 'front.preload.js')
                },
            });
            win.loadURL(url);

            BrowserController.shared.pushWindow(win)
            const index = BrowserController.shared.windows.length -1
            win.on('close', ()=>{
                BrowserController.shared.closedWindow(index)
            })
            return { action: 'deny' };
        });

        mainWindow.on('close', ()=>{
            backWindow.close()
            BrowserController.shared.removeAll()
            app.quit()
        })

        BrowserController.init(mainWindow)
        ChatController.init(backWindow)
    }
    private static checkGoogleLogin = () =>{
        return new Promise<void>( async resolve => {
            const loginWindow = new BrowserWindow({
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                }
            })
            await loginWindow.loadURL("https://accounts.google.com")

            const timer = setInterval(() =>{
                const url = loginWindow.webContents.getURL()
                if(url.includes("myaccount.google.com")) {
                    loginWindow.close()
                    clearInterval(timer)
                    resolve()
                }
            },100)

        })
    }
}