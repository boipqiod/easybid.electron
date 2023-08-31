"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const ElectronRouter_1 = __importDefault(require("./src/routes/ElectronRouter"));
const server = http.createServer((req, res) => {
    fs.readFile(path_1.default.join(__dirname, 'src/views/index.html'), (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
server.listen(3000);
const startEasyBid = () => __awaiter(void 0, void 0, void 0, function* () {
    ElectronRouter_1.default.init();
    const mainWindow = new electron_1.BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
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
    // await ExpressServer.shared.start()
    // await mainWindow.loadURL('http://localhost:3000');
    yield mainWindow.loadURL(`file://${path_1.default.join(__dirname, 'src/views/index.html')}`);
    // await mainWindow.loadURL('http://localhost:3002');
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
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
