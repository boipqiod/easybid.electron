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
const API_1 = __importDefault(require("../model/API"));
const tpye_1 = require("../common/tpye");
class AuthService {
    constructor() {
        this.login = (id) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const config = {
                url: "/auth/login",
                method: tpye_1.httpMethod.post
            };
            const body = {
                directoryName: id
            };
            const res = yield API_1.default.shared.request(config, body);
            console.log("AuthService", res);
            return (_a = res.data) !== null && _a !== void 0 ? _a : false;
        });
    }
}
exports.default = AuthService;
AuthService.shared = new AuthService();
