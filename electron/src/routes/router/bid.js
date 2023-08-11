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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = require("../../model/response");
const BidController_1 = __importDefault(require("../../controllers/BidController"));
const router = (0, express_1.Router)();
router.post('/init', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isInit = yield BidController_1.default.init(data.id, data.fileName, data.youtubeUrl);
    if (!isInit.success) {
        res.send(response_1.APIResponse.getRes(false, isInit.error));
        return;
    }
    const bidList = BidController_1.default.shared.getBidItems();
    res.send(response_1.APIResponse.getRes(true, bidList));
}));
router.post('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const item = yield BidController_1.default.shared.startBid(data.index);
    res.send(response_1.APIResponse.getRes(true, item));
}));
router.post('/end', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const item = yield BidController_1.default.shared.endBid(data.index);
    res.send(response_1.APIResponse.getRes(true, item));
}));
router.get('/now', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const now = BidController_1.default.shared.bidNow();
    res.send(now);
}));
router.get('/isInit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isInit = BidController_1.default.shared.isInit;
    const items = BidController_1.default.shared.bidItems;
    res.send(response_1.APIResponse.getRes(isInit, isInit ? items : []));
}));
//물건이 판매됨
router.post('/sale', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("sale", data);
    BidController_1.default.shared.lastChatId = data.lastChatId;
    data.data.forEach(value => {
        BidController_1.default.shared.saleItemByNow(value.name, value.message);
    });
    res.send(true);
}));
exports.default = router;
