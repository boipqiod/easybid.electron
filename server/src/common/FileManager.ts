import path from "path";
import * as fs from "fs";
import {BidItem} from "./tpye";

export default class FileManager{
    static shared = new FileManager()
    private basePath: string = "../data/";

    saveFile(name: string, data: string) {
        const dir = path.join(this.basePath);

        // Directory 생성
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
        } catch (err) {
            console.error(`Failed to create directory: ${err}`);
            return;
        }

        // 파일 경로 생성
        const filePath = path.join(dir, `${name}.log`);
        const dataString = JSON.stringify(data, null, 2);

        // 파일 쓰기
        try {
            fs.writeFileSync(filePath, data, 'utf-8');
        } catch (err) {
            console.error(`Failed to write file: ${err}`);
        }
    }

    loadFile(id: string, name: string): BidItem[] | null {
        const filePath = path.join(this.basePath, id, `${name}.json`);

        // 파일 경로 확인
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }

        // 파일 읽기
        let dataString;
        try {
            dataString = fs.readFileSync(filePath, 'utf-8');
        } catch (err) {
            console.error(`Failed to read file: ${err}`);
            return null;
        }

        // 파일 파싱
        let data;
        try {
            data = JSON.parse(dataString) as BidItem[];
        } catch (err) {
            console.error(`Failed to parse JSON: ${err}`);
            return null;
        }

        return data;
    }

    searchDirectory = (directoryName: string) =>{
        const dir = path.join(this.basePath, directoryName);
        return fs.existsSync(dir)
    }
}