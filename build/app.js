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
const express_1 = __importDefault(require("express"));
const routes_1 = require("./src/routes");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const expressApp = (0, express_1.default)();
const port = 3000;
expressApp.use((0, cors_1.default)());
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.static(path_1.default.join(__dirname)));
expressApp.use(express_1.default.static(path_1.default.join(__dirname, 'src', 'views')));
expressApp.use(express_1.default.static(path_1.default.join(__dirname, 'build/views')));
(0, routes_1.setRoutes)(expressApp);
let mainWindow;
function createWindow() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
expressApp.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    electron_1.app.on('ready', createWindow);
});
