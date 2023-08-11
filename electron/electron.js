"use strict";
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const server = spawn('node', ['./build/app.js']);
server.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
server.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
server.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
let mainWindow;
app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 850,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:3000');
    }, 2000); // 대기 시간을 조절하실 수 있습니다.
});
