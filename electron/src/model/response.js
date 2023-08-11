"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    constructor(success, data = undefined) {
        this.success = success;
        this.data = data;
    }
}
exports.APIResponse = APIResponse;
APIResponse.getRes = (success, data = undefined) => {
    return new APIResponse(success, data);
};
