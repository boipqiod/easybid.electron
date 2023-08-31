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
class DataRouter {
}
exports.default = DataRouter;
_a = DataRouter;
DataRouter.init = () => {
    electron_1.ipcMain.handle('/data/list', () => __awaiter(void 0, void 0, void 0, function* () {
        const items = BidController_1.default.shared.getBidItems();
        return response_1.APIResponse.getRes(true, items);
    }));
    electron_1.ipcMain.handle('/data/add', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const items = yield BidController_1.default.shared.addBidItem(data.item);
        return response_1.APIResponse.getRes(true, items);
    }));
    electron_1.ipcMain.handle('/data/remove', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const items = yield BidController_1.default.shared.removeBidItem(data.index);
        return response_1.APIResponse.getRes(true, items);
    }));
    electron_1.ipcMain.handle('/data/modify', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const items = yield BidController_1.default.shared.modifyBidItem(data.index, data.item);
        return response_1.APIResponse.getRes(true, items);
    }));
    electron_1.ipcMain.handle('/data/addClient', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const items = yield BidController_1.default.shared.addClient(data.index, data.client);
        return response_1.APIResponse.getRes(true, items);
    }));
};
