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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class YoutubeController {
    constructor(browser, page) {
        this.lastChatId = "";
        this.goto = (url) => __awaiter(this, void 0, void 0, function* () {
            this.url = url;
            yield this.page.goto(url);
        });
        this.getChat = () => __awaiter(this, void 0, void 0, function* () {
            const nodeList = yield this.page.$$('yt-live-chat-text-message-renderer');
            const chatIds = yield Promise.all(nodeList.map(node => node.evaluate(element => element.id)));
            const chatList = nodeList.filter((_, i) => chatIds[i].substring(0, 5) === 'ChwKG');
            let chatStartIndex = 0;
            if (this.lastChatId) {
                const lastChatIndex = chatIds.findIndex(id => id === this.lastChatId);
                if (lastChatIndex !== -1) {
                    chatStartIndex = lastChatIndex + 1;
                }
            }
            const relevantChatList = chatList.slice(chatStartIndex);
            if (relevantChatList.length === 0) {
                return [];
            }
            const resList = [];
            for (const item of relevantChatList) {
                const data = yield this.getNameAndMessage(item);
                if (data)
                    resList.push(data);
            }
            this.lastChatId = yield relevantChatList[relevantChatList.length - 1].evaluate(element => element.id);
            return resList;
        });
        this.getNameAndMessage = (chat) => __awaiter(this, void 0, void 0, function* () {
            const name = yield chat.evaluate(element => element.childNodes[3].childNodes[1].childNodes[3].textContent);
            const message = yield chat.evaluate(element => element.childNodes[3].childNodes[3].textContent);
            if (name && message && this.isNumericString(message)) {
                return {
                    name,
                    message: parseInt(message)
                };
            }
            else {
                return null;
            }
        });
        this.isNumericString = (input) => {
            return !isNaN(parseFloat(input)) && isFinite(Number(input));
        };
        this.url = "";
        this.browser = browser;
        this.page = page;
    }
}
exports.default = YoutubeController;
_a = YoutubeController;
YoutubeController.init = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("YoutubeController init");
    const browser = yield puppeteer_1.default.launch({
        headless: "new"
    });
    const page = yield browser.newPage();
    return new YoutubeController(browser, page);
});
