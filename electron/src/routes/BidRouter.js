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
const electron_1 = require("electron");
const BidController_1 = __importDefault(require("../controllers/BidController"));
const response_1 = require("../model/response");
const ChatController_1 = require("../controllers/ChatController");
class BidRouter {
}
exports.default = BidRouter;
_a = BidRouter;
BidRouter.init = () => {
    electron_1.ipcMain.handle('/bid/init', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const isInit = yield BidController_1.default.init(data.id, data.fileName, data.youtubeUrl);
        return isInit.success ?
            response_1.APIResponse.getRes(true, BidController_1.default.shared.getBidItems()) :
            response_1.APIResponse.getRes(false, isInit.error);
    }));
    electron_1.ipcMain.handle('/bid/start', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const item = yield BidController_1.default.shared.startBid(data.index);
        return response_1.APIResponse.getRes(true, item);
    }));
    electron_1.ipcMain.handle('/bid/end', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const item = yield BidController_1.default.shared.endBid(data.index);
        return response_1.APIResponse.getRes(true, item);
    }));
    electron_1.ipcMain.handle('/bid/isInit', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const isInit = BidController_1.default.shared.isInit;
        const items = BidController_1.default.shared.bidItems;
        return response_1.APIResponse.getRes(isInit, isInit ? items : []);
    }));
    electron_1.ipcMain.handle('/bid/message', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        ChatController_1.ChatController.shared.sendChat(data);
        return response_1.APIResponse.getRes(true, null);
    }));
};
