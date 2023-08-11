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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
class FileManager {
    constructor() {
        this.basePath = "../data/";
        this.searchDirectory = (directoryName) => {
            const dir = path_1.default.join(this.basePath, directoryName);
            return fs.existsSync(dir);
        };
    }
    saveFile(name, data) {
        const dir = path_1.default.join(this.basePath);
        // Directory 생성
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }
        catch (err) {
            console.error(`Failed to create directory: ${err}`);
            return;
        }
        // 파일 경로 생성
        const filePath = path_1.default.join(dir, `${name}.log`);
        const dataString = JSON.stringify(data, null, 2);
        // 파일 쓰기
        try {
            fs.writeFileSync(filePath, data, 'utf-8');
        }
        catch (err) {
            console.error(`Failed to write file: ${err}`);
        }
    }
    loadFile(id, name) {
        const filePath = path_1.default.join(this.basePath, id, `${name}.json`);
        // 파일 경로 확인
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }
        // 파일 읽기
        let dataString;
        try {
            dataString = fs.readFileSync(filePath, 'utf-8');
        }
        catch (err) {
            console.error(`Failed to read file: ${err}`);
            return null;
        }
        // 파일 파싱
        let data;
        try {
            data = JSON.parse(dataString);
        }
        catch (err) {
            console.error(`Failed to parse JSON: ${err}`);
            return null;
        }
        return data;
    }
}
exports.default = FileManager;
FileManager.shared = new FileManager();
