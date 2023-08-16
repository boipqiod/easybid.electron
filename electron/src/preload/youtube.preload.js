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
electron_1.contextBridge.exposeInMainWorld('myAPI', {
    getChat: (lastChatId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("lastChatId", lastChatId);
        try {
            const nodeList = Array.from(document.querySelectorAll('yt-live-chat-text-message-renderer'));
            const chatIds = nodeList.map(node => node.id);
            const chatList = nodeList.filter((_, i) => chatIds[i].substring(0, 5) === 'ChwKG');
            let chatStartIndex = 0;
            if (lastChatId) {
                let lastChatIndex = -1;
                while (lastChatIndex === -1) {
                    lastChatIndex = chatIds.findIndex(id => id === lastChatId);
                    if (lastChatIndex === -1)
                        lastChatId = chatIds[chatList.length - 1];
                    else
                        break;
                }
                chatStartIndex = lastChatIndex + 1;
            }
            const relevantChatList = chatList.slice(chatStartIndex);
            if (relevantChatList.length === 0) {
                return { chatList: [], lastChatId };
            }
            const resList = [];
            for (const item of relevantChatList) {
                const data = getNameAndMessage(item);
                if (data)
                    resList.push(data);
            }
            lastChatId = relevantChatList[relevantChatList.length - 1].id;
            const res = { chatList: resList, lastChatId };
            return res;
        }
        catch (e) {
        }
        function getNameAndMessage(chat) {
            const name = chat.childNodes[3].childNodes[1].childNodes[3].textContent;
            const message = chat.childNodes[3].childNodes[3].textContent;
            if (name && message && isNumericString(message)) {
                return {
                    name,
                    message: parseInt(message)
                };
            }
            else {
                return null;
            }
        }
        function isNumericString(input) {
            return !isNaN(parseFloat(input)) && isFinite(Number(input));
        }
    }),
    sendChat: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const clickEvent = new Event("click", { bubbles: true });
        const inputEvent = new Event("input", { bubbles: true });
        const keyDownEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            bubbles: true,
            cancelable: true
        });
        const input = document.querySelector("#input-container #input #input");
        const button = document.querySelector("#send-button button");
        if (!input || !button)
            return;
        input.focus();
        input.textContent = message;
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(keyDownEvent);
        button.click();
        button.dispatchEvent(clickEvent);
    })
});
