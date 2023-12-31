import {app, Menu, BrowserWindow, HandlerDetails, MenuItemConstructorOptions} from "electron";
import path from "path";
import {BrowserController} from "../common/BrowserController";
import {ChatController} from "../common/ChatController";
import Routes from "../routes/Routes";
import ExpressController from "./ExpressContoller";

export default class AppController {
    static init = async () => {
        await ExpressController.init()
        await AppController.checkGoogleLogin()
        await AppController.startEasyBid()
    }

    private static startEasyBid = async () => {
        Routes.init()
        AppController.initMenu()
        await AppController.initMain()
        await AppController.initBack()
    }
    private static initMain = async () => {
        const mainWindow = new BrowserWindow({
            width: 750,
            height: 1080,
            webPreferences: {
                partition: 'persist:main',
                contextIsolation: true,
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload', 'frontPreload.js')
            }
        })
        //새창 열렸을 때, preload 주입 코드
        mainWindow.webContents.setWindowOpenHandler(this.newWindow);
        //창 닫힘 이벤트
        mainWindow.on('close', this.stop)

        //url 로드
        // await mainWindow.loadURL(`http://localhost:3002`);
        await mainWindow.loadURL(`http://localhost:3000`);

        //브라우저 컨트롤러 초기화
        BrowserController.init(mainWindow)
    }

    private static initBack = async () => {
        const backWindow = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload', 'youtubePreload.js')
            }
        })

        ChatController.init(backWindow)
    }

    private static initMenu = () => {
        const template: MenuItemConstructorOptions[] = [
            {
                label: app.name,
                submenu: [
                    { role: 'about' }
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { role: 'selectAll' }
                ]
            }
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    private static newWindow = ({url}: HandlerDetails): { action: 'deny' | 'allow' } => {
        const win = new BrowserWindow({
            webPreferences: {
                partition: 'persist:main',
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, 'preload', 'frontPreload.js')
            },
        });
        win.loadURL(url).then();

        BrowserController.shared.pushWindow(win)
        const index = BrowserController.shared.windows.length - 1
        win.on('close', () => {
            BrowserController.shared.closedWindow(index)
        })

        return {action: 'deny'};
    }

    private static stop = () => {
        ExpressController.stop()
        BrowserController.shared.removeAll()
        app.quit()
    }

    private static checkGoogleLogin = () => {
        return new Promise<void>(async resolve => {
            const loginWindow = new BrowserWindow({
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                }
            })
            await loginWindow.loadURL("https://accounts.google.com")

            const timer = setInterval(() => {
                const url = loginWindow.webContents.getURL()
                if (url.includes("myaccount.google.com")) {
                    loginWindow.close()
                    clearInterval(timer)
                    resolve()
                }
            }, 1000)

        })
    }
}