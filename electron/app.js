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
exports.newWindow = void 0;
const electron_1 = require("electron");
const ExpressServer_1 = require("./ExpressServer");
const Observer_1 = require("./src/controllers/Observer");
const path_1 = __importDefault(require("path"));
let mainWindow;
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        ExpressServer_1.ExpressServer.shared.start();
        mainWindow = new electron_1.BrowserWindow({
            width: 850,
            height: 1080,
            webPreferences: {
                nodeIntegration: true,
            }
        });
        // 아래의 코드는 localhost가 시작될 때까지 기다립니다.
        while (true) {
            try {
                yield new Promise((resolve, reject) => {
                    const http = require("http");
                    http.get('http://localhost:3000', (res) => {
                        res.statusCode === 200 ? resolve(null) : reject(null);
                    });
                });
                break;
            }
            catch (_a) {
                continue;
            }
        }
        yield mainWindow.loadURL('http://localhost:3000');
        try {
            const window = new electron_1.BrowserWindow({
                show: false,
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    preload: path_1.default.join(__dirname, 'preload.js')
                }
            });
            Observer_1.Observer.init(window);
        }
        catch (err) {
            const error = err;
            yield (0, exports.newWindow)(`error ${JSON.stringify(error)}`);
        }
    });
}
electron_1.app.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield createWindow();
}));
const newWindow = (text) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(text);
    // await new BrowserWindow({
    //     width: 300,
    //     height: 300,
    //     webPreferences: {
    //         nodeIntegration: true,
    //     }
    // }).loadURL(`data:text/html,${text}`);
});
exports.newWindow = newWindow;
