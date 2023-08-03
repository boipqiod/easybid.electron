import express from "express";
import {setRoutes} from "./src/routes";
import cors from 'cors'
import path from "path";

import { app, BrowserWindow } from "electron"

const expressApp = express();
const port = 3000;
expressApp.use(cors());

expressApp.use(express.json());
expressApp.use(express.static(path.join(__dirname)));
expressApp.use(express.static(path.join(__dirname, 'src', 'views')));
expressApp.use(express.static(path.join(__dirname, 'build/views')));

setRoutes(expressApp)
let mainWindow: BrowserWindow | null;

async function createWindow() {
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
}

expressApp.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    app.on('ready', createWindow);
});