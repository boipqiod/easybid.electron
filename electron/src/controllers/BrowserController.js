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
exports.BrowserController = void 0;
const electron_1 = require("electron");
const tpye_1 = require("../common/tpye");
const ChatController_1 = require("./ChatController");
class BrowserController {
    constructor(window) {
        this.windows = [];
        this.pushWindow = (window) => {
            this.windows.push(window);
        };
        this.removeWindow = (index) => {
            this.windows[index].close();
            this.closedWindow(index);
        };
        this.closedWindow = (index) => {
            this.windows.splice(index, 1);
        };
        this.removeAll = () => {
            this.windows.forEach((value, index) => {
                if (index !== 0)
                    value.close();
            });
        };
        this.setItems = (items) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.windows.forEach(window => {
                    window.webContents.send(tpye_1.interfaceType.setItem, items);
                });
            }
            catch (e) {
                console.log("BrowserController setItems", e);
            }
        });
        this.endBid = (index, items) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.windows.forEach(window => {
                    window.webContents.send(tpye_1.interfaceType.endBid, { items, index });
                });
            }
            catch (e) {
                console.log("BrowserController setItems", e);
            }
        });
        this.startBid = (index, items) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.windows.forEach(window => {
                    window.webContents.send(tpye_1.interfaceType.startBid, { items, index });
                });
            }
            catch (e) {
                console.log("BrowserController setItems", e);
            }
        });
        this.setMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.windows.forEach(window => {
                    window.webContents.send(tpye_1.interfaceType.message, message);
                });
            }
            catch (e) {
                console.log("BrowserController setItems", e);
            }
        });
        this.windows.push(window);
    }
}
exports.BrowserController = BrowserController;
BrowserController.init = (window) => {
    try {
        BrowserController.shared = new BrowserController(window);
        electron_1.ipcMain.handle('sendData', (event, args) => {
            const data = args;
            ChatController_1.ChatController.shared.sendChat(data.data);
            return;
        });
    }
    catch (e) {
        console.log(e);
    }
};
