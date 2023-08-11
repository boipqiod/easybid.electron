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
const tpye_1 = require("../common/tpye");
const API_1 = __importDefault(require("../model/API"));
class BidService {
    constructor(id, fileName) {
        this.saveBidData = (data) => __awaiter(this, void 0, void 0, function* () {
            const body = {
                data: data,
                ebId: this.id,
                fileName: this.fileName
            };
            const config = {
                method: tpye_1.httpMethod.post,
                url: "/data/save"
            };
            yield API_1.default.shared.request(config, body);
        });
        this.getBidData = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = {
                ebId: this.id,
                fileName: this.fileName
            };
            const config = {
                method: tpye_1.httpMethod.get,
                url: "/data/load"
            };
            const res = yield API_1.default.shared.request(config, body);
            return (_a = res.data) !== null && _a !== void 0 ? _a : [];
        });
        this.id = id;
        this.fileName = fileName;
    }
}
exports.default = BidService;
