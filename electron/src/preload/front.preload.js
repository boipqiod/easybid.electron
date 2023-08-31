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
    },
});
electron_1.contextBridge.exposeInMainWorld('data', {
    request: (event, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield electron_1.ipcRenderer.invoke(event, data);
    })
});
