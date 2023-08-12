"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfaceType = exports.httpMethod = exports.BidStatus = void 0;
/**enum****************************/
var BidStatus;
(function (BidStatus) {
    BidStatus[BidStatus["ready"] = 0] = "ready";
    BidStatus[BidStatus["sale"] = 1] = "sale";
    BidStatus[BidStatus["end"] = 2] = "end";
})(BidStatus = exports.BidStatus || (exports.BidStatus = {}));
var httpMethod;
(function (httpMethod) {
    httpMethod["get"] = "get";
    httpMethod["post"] = "post";
})(httpMethod = exports.httpMethod || (exports.httpMethod = {}));
var interfaceType;
(function (interfaceType) {
    interfaceType["startBid"] = "startBid";
    interfaceType["endBid"] = "endBid";
    interfaceType["setItem"] = "setItem";
    interfaceType["message"] = "message";
})(interfaceType = exports.interfaceType || (exports.interfaceType = {}));
