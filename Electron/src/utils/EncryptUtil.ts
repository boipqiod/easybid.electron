import * as crypto from "crypto";

export default class EncryptUtil {

    static sha256(data: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }
}