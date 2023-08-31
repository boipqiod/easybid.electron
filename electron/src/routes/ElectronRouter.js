"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const BidRouter_1 = __importDefault(require("./BidRouter"));
const DadaRouter_1 = __importDefault(require("./DadaRouter"));
class ElectronRouter {
}
exports.default = ElectronRouter;
ElectronRouter.init = () => {
    AuthRouter_1.default.init();
    BidRouter_1.default.init();
    DadaRouter_1.default.init();
};
