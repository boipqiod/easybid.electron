"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tpye_1 = require("../common/tpye");
const BidService_1 = __importDefault(require("../service/BidService"));
const SSE_1 = __importStar(require("./SSE"));
const Observer_1 = require("./Observer");
class BidController {
    constructor(id, fileName) {
        this.bidItems = [];
        this.lastChatId = undefined;
        this.saleIndex = -1;
        this.isInit = false;
        //서버에 아이템 저장하기
        this.saveBidItemsToServer = () => __awaiter(this, void 0, void 0, function* () {
            yield this.service.saveBidData(this.bidItems);
        });
        //서버에서 아이템 져오기
        this.getBidItemsFromServer = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getBidData();
        });
        //비드 아이템 반환
        this.getBidItems = () => {
            return this.bidItems;
        };
        this.reloadBidItems = () => __awaiter(this, void 0, void 0, function* () {
            this.bidItems = yield this.getBidItemsFromServer();
            this.saleIndex = this.bidItems.findIndex(value => value.status === tpye_1.BidStatus.sale);
            return this.bidItems;
        });
        //비드 아이템 추가
        this.addBidItem = (data) => __awaiter(this, void 0, void 0, function* () {
            this.bidItems.push(data);
            console.log("addBidItem", data.name, this.bidItems.length);
            yield this.saveBidItemsToServer();
            return this.bidItems;
        });
        this.removeBidItem = (index) => __awaiter(this, void 0, void 0, function* () {
            console.log("removeBidItem", index);
            this.bidItems.splice(index, 1);
            yield this.saveBidItemsToServer();
            return this.bidItems;
        });
        //아이템 수정
        this.modifyBidItem = (index, data) => __awaiter(this, void 0, void 0, function* () {
            data.saleAmount = data.clients.reduce((total, client) => total + client.amount, 0);
            this.bidItems[index] = data;
            SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.setItems, data: { items: this.bidItems } });
            yield this.saveBidItemsToServer();
            return this.bidItems;
        });
        //상품에 구매자 추가
        this.addClient = (index, client) => __awaiter(this, void 0, void 0, function* () {
            const item = this.bidItems[index];
            const findIndex = item.clients.findIndex(v => v.name === client.name);
            //없는 경우
            if (findIndex === -1) {
                item.clients.push({
                    name: client.name,
                    amount: client.amount
                });
            }
            else {
                //기구매자에 추가
                item.clients[findIndex].amount += client.amount;
            }
            item.saleAmount = item.clients.reduce((total, client) => total + client.amount, 0);
            yield this.saveBidItemsToServer();
            return this.bidItems;
        });
        /****경매 진행****/
        this.startBid = (index) => __awaiter(this, void 0, void 0, function* () {
            console.log("startBid", index);
            console.log(this.bidItems[index].name);
            //판매하는 인덱스 스테이트 변경
            this.bidItems[index].status = tpye_1.BidStatus.sale;
            yield this.saveBidItemsToServer();
            this.saleIndex = index;
            //메세지 발송
            const message = `"${this.bidItems[index].name}  [${formatCurrency(this.bidItems[index].price)}]" 상품의 판매를 시작합니다. 상품을 구매하고 싶은 만큼 숫자로 입력해주세요.`;
            this.sendMessage(message);
            SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.startSale, data: { items: this.bidItems, index } });
            this.startTimer(index);
            return this.bidItems;
        });
        this.endBid = (index) => __awaiter(this, void 0, void 0, function* () {
            console.log("endBid", index);
            console.log("bidItems", this.bidItems);
            console.log(this.bidItems[index].name);
            //판매 아이템 인덱스 변경
            this.bidItems[index].status = tpye_1.BidStatus.end;
            yield this.saveBidItemsToServer();
            //메세지 발송
            SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.endSale, data: { items: this.bidItems, index } });
            const message = `"${this.bidItems[index].name}"  상품 판매가 종료되었습니다. 구매하신분들은 확인해주세요.`;
            this.sendMessage(message);
            clearInterval(this.timer);
            return this.bidItems;
        });
        this.startTimer = (index) => {
            console.log("start Timer");
            this.timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const chatList = yield Observer_1.Observer.shared.getChat();
                if (chatList.length > 0)
                    console.log(chatList);
                chatList.forEach(chat => {
                    this.saleItemByIndex(index, chat.name, chat.message);
                });
            }), 100);
        };
        /****경매 프로스세스****/
        this.saleItemByIndex = (index, name, amount) => {
            const item = this.bidItems[index];
            //판매 중인 상품이 아닐때 리턴
            if (item.status !== tpye_1.BidStatus.sale)
                return;
            //구매 조건에 따라 수량이 변경되기 위해
            let _amount = amount;
            let message = "";
            //최대 판매 개수를 넘어가면 최대치만큼만 판매
            if (item.amount !== 0 && item.amount - item.saleAmount < amount) {
                _amount = item.amount - item.saleAmount;
                //판매 메시지 작성
                if (index === this.saleIndex) {
                    message = `${name}님 "${item.name} [${formatCurrency(item.price)}]" ${_amount}개* 구매 확인되었습니다.`;
                }
            }
            else {
                //판매 메시지 전송
                if (index === this.saleIndex) {
                    message = `${name}님 "${item.name} [${formatCurrency(item.price)}]" ${_amount}개 구매 확인되었습니다.`;
                }
            }
            //판매량 추가
            item.saleAmount += _amount;
            const findIndex = item.clients.findIndex(v => v.name === name);
            //없는 경우
            if (findIndex === -1) {
                item.clients.push({
                    name,
                    amount: _amount
                });
            }
            else {
                //기구매자에 추가
                item.clients[findIndex].amount += _amount;
            }
            this.sendMessage(message);
            //판매 완료
            if (item.amount !== 0 && item.saleAmount >= item.amount) {
                this.endBid(index).then();
            }
            else {
                SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.sale, data: { items: this.bidItems, index } });
            }
            this.bidItems[index] = item;
            this.saveBidItemsToServer().then();
        };
        this.saleItemByNow = (name, amount) => {
            this.saleItemByIndex(this.saleIndex, name, amount);
        };
        this.sendMessage = (message) => {
            SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.message, data: message });
            Observer_1.Observer.shared.sendMessage(message);
        };
        /**경매 상태**/
        this.bidNow = () => {
            console.log("bidNow", this.saleIndex, this.lastChatId);
            return {
                onSale: this.saleIndex !== -1,
                saleIndex: this.saleIndex,
                lastChatId: this.lastChatId
            };
        };
        this.id = id;
        this.service = new BidService_1.default(id, fileName);
    }
}
exports.default = BidController;
_a = BidController;
BidController.shared = new BidController("unknown", "unknown");
BidController.init = (id, fileName, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        BidController.shared = new BidController(id, fileName);
        if (Observer_1.Observer.shared.url !== url)
            yield Observer_1.Observer.shared.loadPage(url);
        yield BidController.shared.reloadBidItems();
        if (BidController.shared.saleIndex !== -1)
            BidController.shared.startTimer(BidController.shared.saleIndex);
        BidController.shared.isInit = true;
        return { success: true, error: null };
    }
    catch (e) {
        return { success: false, error: e !== null && e !== void 0 ? e : "error" };
    }
});
const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    });
    return formatter.format(value);
};
