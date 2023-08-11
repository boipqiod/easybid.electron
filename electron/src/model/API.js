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
const axios_1 = __importDefault(require("axios"));
class API {
    constructor() {
        this.setConfig = (apiConfig, data) => {
            const config = {
                method: apiConfig.method,
                url: `${apiConfig.url}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            if (apiConfig.method === tpye_1.httpMethod.get)
                config.params = data;
            else
                config.data = data;
            return config;
        };
        /**
         * 요청을 보내는 모듈
         * @param apiConfig
         * @param data
         */
        this.request = (apiConfig, data) => __awaiter(this, void 0, void 0, function* () {
            const config = this.setConfig(apiConfig, data);
            try {
                const res = yield this.axios.request(config);
                // console.log(
                //     "\nAPI Request\n",
                //     config,
                //     "\nResponse \n",
                //     res.data as U
                // )
                return { success: true, data: res.data };
            }
            catch (e) {
                console.warn("\nAPI Request\n", config, "\nError \n", e);
                return { success: false };
            }
        });
        this.axios = axios_1.default.create({
            // baseURL: `http://localhost:3003`
            baseURL: `http://152.69.231.177`
        });
    }
}
exports.default = API;
API.shared = new API();
