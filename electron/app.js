"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const ExpressServer_1 = require("./ExpressServer");
const ChatController_1 = require("./src/controllers/ChatController");
const path_1 = __importDefault(require("path"));
const BrowserController_1 = require("./src/controllers/BrowserController");
const startEasyBid = () => __awaiter(void 0, void 0, void 0, function* () {
    const mainWindow = new electron_1.BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            preload: path_1.default.join(__dirname, 'src', 'preload', 'front.preload.js')
        }
    });
    const backWindow = new electron_1.BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path_1.default.join(__dirname, 'src', 'preload', 'youtube.preload.js')
        }
    });
    yield ExpressServer_1.ExpressServer.shared.start();
    yield mainWindow.loadURL('http://localhost:3000');
    // await mainWindow.loadURL('http://localhost:3002');
    // 새 창을 열 때의 동작을 정의합니다.
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // 새로운 BrowserWindow 인스턴스를 생성하고 preload 스크립트를 지정합니다.
        const win = new electron_1.BrowserWindow({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path_1.default.join(__dirname, 'src', 'preload', 'front.preload.js')
            },
        });
        win.loadURL(url);
        BrowserController_1.BrowserController.shared.pushWindow(win);
        const index = BrowserController_1.BrowserController.shared.windows.length - 1;
        win.on('close', () => {
            BrowserController_1.BrowserController.shared.closedWindow(index);
        });
        return { action: 'deny' };
    });
    mainWindow.on('close', () => {
        backWindow.close();
        ExpressServer_1.ExpressServer.shared.end();
        BrowserController_1.BrowserController.shared.removeAll();
        electron_1.app.quit();
    });
    BrowserController_1.BrowserController.init(mainWindow);
    ChatController_1.ChatController.init(backWindow);
});
const checkGoogleLogin = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const loginWindow = new electron_1.BrowserWindow({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
            }
        });
        yield loginWindow.loadURL("https://accounts.google.com");
        const timer = setInterval(() => {
            const url = loginWindow.webContents.getURL();
            if (url.includes("myaccount.google.com")) {
                loginWindow.close();
                clearInterval(timer);
                resolve();
            }
        }, 1000);
    }));
};
electron_1.app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield checkGoogleLogin();
    yield startEasyBid();
}));
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
