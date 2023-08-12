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
exports.textModal = void 0;
const electron_1 = require("electron");
const ExpressServer_1 = require("./ExpressServer");
const ChatController_1 = require("./src/controllers/ChatController");
const path_1 = __importDefault(require("path"));
const BrowserController_1 = require("./src/controllers/BrowserController");
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
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
    setInterval(() => {
        mainWindow.webContents.send('test');
    }, 1000);
    // await mainWindow.loadURL('http://localhost:3000');
    yield mainWindow.loadURL('http://localhost:3002');
    BrowserController_1.BrowserController.init(mainWindow);
    ChatController_1.ChatController.init(backWindow);
});
electron_1.app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield createWindow();
}));
const textModal = (text) => __awaiter(void 0, void 0, void 0, function* () {
    yield new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        }
    }).loadURL(`data:text/html,${text}`);
});
exports.textModal = textModal;
