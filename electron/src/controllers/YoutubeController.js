"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default class YoutubeController {
//
//     readonly browser: Browser;
//     readonly page: Page;
//     lastChatId: string = "";
//     private _url: string = "";
//
//     constructor(browser: Browser, page: Page) {
//         this.browser = browser;
//         this.page = page;
//     }
//
//     get url(): string {
//         return this._url;
//     }
//
//     set url(value: string) {
//         this.page.goto(value).then(()=>{
//             this._url = value;
//         })
//     }
//
//     static init = async () => {
//         console.log("YoutubeController init")
//         const browser = await puppeteer.launch({
//             headless: "new"
//         });
//         const page = await browser.newPage();
//         return new YoutubeController(browser, page);
//     }
//
//     goto = async (url: string) =>{
//         this._url = url
//         await this.page.goto(url)
//     }
//
//     getChat = async () => {
//         const nodeList = await this.page.$$('yt-live-chat-text-message-renderer');
//         const chatIds = await Promise.all(
//             nodeList.map(node => node.evaluate(element => element.id))
//         );
//
//         const chatList = nodeList.filter((_, i) => chatIds[i].substring(0, 5) === 'ChwKG');
//
//         let chatStartIndex = 0;
//         if (this.lastChatId) {
//             const lastChatIndex = chatIds.findIndex(id => id === this.lastChatId);
//             if (lastChatIndex !== -1) {
//                 chatStartIndex = lastChatIndex + 1;
//             }
//         }
//
//         const relevantChatList = chatList.slice(chatStartIndex);
//
//         if (relevantChatList.length === 0) {
//             return [];
//         }
//
//         const resList: { message: number; name: string; }[] = [];
//         for (const item of relevantChatList) {
//             const data = await this.getNameAndMessage(item);
//             if (data) resList.push(data);
//         }
//
//         this.lastChatId = await relevantChatList[relevantChatList.length - 1].evaluate(element => element.id);
//
//         return resList;
//     }
//
//     private getNameAndMessage = async (chat: ElementHandle) => {
//         const name = await chat.evaluate(element => element.childNodes[3].childNodes[1].childNodes[3].textContent);
//         const message = await chat.evaluate(element => element.childNodes[3].childNodes[3].textContent);
//
//         if (name && message && this.isNumericString(message)) {
//             return {
//                 name,
//                 message: parseInt(message)
//             };
//         } else {
//             return null;
//         }
//     }
//
//     private isNumericString = (input: string): boolean => {
//         return !isNaN(parseFloat(input)) && isFinite(Number(input));
//     }
// }
