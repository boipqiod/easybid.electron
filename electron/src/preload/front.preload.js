"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('bid', {
    setItems: (bidItems) => {
        localStorage.setItem("bidItems", JSON.stringify(bidItems));
    },
    addItem: (bidItem) => {
        const data = localStorage.getItem("bidItems");
        if (data) {
            const items = JSON.parse(data);
            localStorage.setItem("bidItems", JSON.stringify([...items, bidItem]));
        }
        else {
            localStorage.setItem("bidItems", JSON.stringify([bidItem]));
        }
    },
    setSaleIndex: (index, isStart) => {
        localStorage.setItem("saleIndex", JSON.stringify({ index, isStart }));
    },
    addMessage: (message) => {
        const data = localStorage.getItem("copy");
        if (data) {
            const messageList = JSON.parse(data);
            localStorage.setItem("copy", JSON.stringify([...messageList, message]));
        }
        else {
            localStorage.setItem("copy", JSON.stringify([message]));
        }
    },
    setObserver: (event, callback) => {
        electron_1.ipcRenderer.on(event, (event, args) => { callback(args); });
    }
});
