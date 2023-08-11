"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSEType = void 0;
class SSE {
    constructor() {
        this.sseList = [];
        this.append = (res) => {
            console.log("SSE Append", this.sseList.length);
            this.sseList.push(res);
        };
        this.remove = (index) => {
            this.sseList.splice(index, 1);
        };
        this.pushAll = (data) => {
            console.log("push ALL sse", data);
            this.sseList.forEach(v => {
                this.push(v, data);
            });
        };
        this.push = (res, data) => {
            res.write(`data: ${JSON.stringify({ data })}\n\n`);
        };
        setInterval(() => {
            this.pushAll({
                type: SSEType.session
            });
        }, 50 * 1000);
    }
}
exports.default = SSE;
SSE.shared = new SSE();
var SSEType;
(function (SSEType) {
    //세션 유지용
    SSEType["session"] = "session";
    SSEType["message"] = "message";
    SSEType["sendMessage"] = "sendMessage";
    SSEType["startSale"] = "startSale";
    SSEType["endSale"] = "endSale";
    SSEType["sale"] = "sale";
    SSEType["saleClient"] = "saleClient";
    SSEType["setItems"] = "setItems";
})(SSEType = exports.SSEType || (exports.SSEType = {}));
