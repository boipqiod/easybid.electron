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
exports.ChatController = void 0;
class ChatController {
    constructor(window) {
        this.url = "";
        this.messageList = [];
        this.loadPage = (url) => __awaiter(this, void 0, void 0, function* () {
            yield this.window.loadURL(url);
            yield this.getChat();
        });
        this.getChat = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.window.webContents.executeJavaScript(`window.myAPI.getChat("${this.lastChatId}")`);
                if (res.lastChatId)
                    this.lastChatId = res.lastChatId;
                return res.chatList;
            }
            catch (e) {
                console.error('Error while getting chat:', e);
                return [];
            }
        });
        this.sendChat = (message) => {
            if (this.messageList.length === 0)
                this.setTimer();
            this.messageList.push(message);
        };
        this.setTimer = () => {
            this.timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (this.messageList.length === 0) {
                    clearInterval(this.timer);
                    return;
                }
                else
                    yield this._sendChat((_a = this.messageList.shift()) !== null && _a !== void 0 ? _a : "");
            }), 0);
        };
        this._sendChat = (message) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.window.webContents.executeJavaScript(`window.myAPI.sendChat('${message}')`);
            }
            catch (e) {
                console.error('Error while sending chat:', e);
            }
        });
        this.window = window;
        this.timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.messageList.length === 0) {
                clearInterval(this.timer);
                return;
            }
            else
                yield this._sendChat((_a = this.messageList.shift()) !== null && _a !== void 0 ? _a : "");
        }), 1);
    }
}
exports.ChatController = ChatController;
ChatController.init = (window) => {
    try {
        ChatController.shared = new ChatController(window);
    }
    catch (e) {
        console.log(e);
    }
};
