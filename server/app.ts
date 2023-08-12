import {app, BrowserWindow, ipcMain} from "electron"
import {ExpressServer} from "./ExpressServer";
import {ChatController} from "./src/controllers/ChatController";
import path from "path";
import {BrowserController} from "./src/controllers/BrowserController";


const createWindow = async () =>{
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'src', 'preload', 'front.preload.js')
        }
    });
    const backWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'src', 'preload', 'youtube.preload.js')
        }
    })

    await ExpressServer.shared.start()

    setInterval(()=>{
        mainWindow.webContents.send('test')
    },1000)
    // await mainWindow.loadURL('http://localhost:3000');
    await mainWindow.loadURL('http://localhost:3002');

    BrowserController.init(mainWindow)
    ChatController.init(backWindow)

}

app.on('ready', async () => {
    await createWindow()
})

export const textModal = async (text: string) => {
    await new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        }
    }).loadURL(`data:text/html,${text}`);
}