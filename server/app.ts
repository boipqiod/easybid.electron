import {app, BrowserWindow, ipcMain} from "electron"
import {ExpressServer} from "./ExpressServer";
import {ChatController} from "./src/controllers/ChatController";
import path from "path";
import {BrowserController} from "./src/controllers/BrowserController";


const startEasyBid = async () => {
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
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

    await ExpressServer.shared.start()
    // await mainWindow.loadURL('http://localhost:3000');
    await mainWindow.loadURL('http://localhost:3002');

    // 새 창을 열 때의 동작을 정의합니다.
    mainWindow.webContents.setWindowOpenHandler(({url}) => {
        // 새로운 BrowserWindow 인스턴스를 생성하고 preload 스크립트를 지정합니다.
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
        ExpressServer.shared.end()
        BrowserController.shared.removeAll()
        app.quit()
    })

    BrowserController.init(mainWindow)
    ChatController.init(backWindow)
}


const checkGoogleLogin = ():Promise<void> =>{
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
        },1000)

    })
}

app.on('ready', async () => {
    await checkGoogleLogin()
    await startEasyBid()
})

// ipcMain.on('sendChat', (event, args)=>{
//     console.log("send-chat args", args)
// })

// export const textModal = async (text: string) => {
//     await new BrowserWindow({
//         webPreferences: {
//             nodeIntegration: true,
//         }
//     }).loadURL(`data:text/html,${text}`);
// }