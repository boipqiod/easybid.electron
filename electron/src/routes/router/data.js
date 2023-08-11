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
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = BidController_1.default.shared.getBidItems();
    res.send(response_1.APIResponse.getRes(true, items));
}));
//추가하기
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const items = yield BidController_1.default.shared.addBidItem(data.item);
    res.send(response_1.APIResponse.getRes(true, items));
}));
//삭제하기
router.post('/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const items = yield BidController_1.default.shared.removeBidItem(data.index);
    res.send(response_1.APIResponse.getRes(true, items));
}));
//수정하기
router.post('/modify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const items = yield BidController_1.default.shared.modifyBidItem(data.index, data.item);
    res.send(response_1.APIResponse.getRes(true, items));
}));
//구매자 추가하기
router.post('/addClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const items = yield BidController_1.default.shared.addClient(data.index, data.client);
    res.send(response_1.APIResponse.getRes(true, items));
}));
exports.default = router;
