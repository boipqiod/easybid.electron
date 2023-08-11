"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SSE_1 = __importStar(require("../../controllers/SSE"));
const response_1 = require("../../model/response");
const router = (0, express_1.Router)();
router.get('/events', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    };
    res.writeHead(200, headers);
    const index = SSE_1.default.shared.sseList.length - 1;
    SSE_1.default.shared.append(res);
    req.on('close', () => {
        console.log("SSE CLOSE");
        SSE_1.default.shared.remove(index);
    });
});
router.post('/sendMessage', (req, res) => {
    const data = req.body;
    SSE_1.default.shared.pushAll({ type: SSE_1.SSEType.sendMessage, data: data });
    res.send(response_1.APIResponse.getRes(true));
});
exports.default = router;
