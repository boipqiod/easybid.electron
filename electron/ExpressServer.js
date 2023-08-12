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
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./src/routes");
const cors_1 = __importDefault(require("cors"));
class ExpressServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3000;
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port, () => {
                console.log(`Server is running at http://localhost:${this.port}`);
            });
        });
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname)));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'src', 'views')));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'build/views')));
        (0, routes_1.setRoutes)(this.app);
    }
}
exports.ExpressServer = ExpressServer;
ExpressServer.shared = new ExpressServer();
