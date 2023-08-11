import {app, BrowserWindow, contextBridge} from "electron"
import {ExpressServer} from "./ExpressServer";
import {Observer} from "./src/controllers/Observer";
import path from "path";

let mainWindow: BrowserWindow | null;

async function createWindow() {
    ExpressServer.shared.start()

    mainWindow = new BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // 아래의 코드는 localhost가 시작될 때까지 기다립니다.
    while(true) {
        try {
            await new Promise((resolve, reject) => {
                const http = require("http");
                http.get('http://localhost:3000', (res: any) => {
                    res.statusCode === 200 ? resolve(null) : reject(null);
                });
            });
            break;
        } catch {
            continue;
        }
    }

    await mainWindow.loadURL('http://localhost:3000');

    try {
        const window = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload.js')
            }
        })

        Observer.init(window)
    }catch (err) {
        const error: Error = err as Error
        await newWindow(`error ${JSON.stringify(error)}`)
    }
}

app.on('ready', async () =>{
    await createWindow()
})

export const newWindow = async (text: string)=>{

    console.log(text)

    // await new BrowserWindow({
    //     width: 300,
    //     height: 300,
    //     webPreferences: {
    //         nodeIntegration: true,
    //     }
    // }).loadURL(`data:text/html,${text}`);
}
