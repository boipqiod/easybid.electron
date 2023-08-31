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
const AuthService_1 = __importDefault(require("../service/AuthService"));
const response_1 = require("../model/response");
class AuthRouter {
}
exports.default = AuthRouter;
_a = AuthRouter;
AuthRouter.init = () => {
    electron_1.ipcMain.handle('/auth/login', (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const data = args;
        const authResponse = yield AuthService_1.default.shared.login(data.id);
        return response_1.APIResponse.getRes(true, authResponse);
    }));
};
