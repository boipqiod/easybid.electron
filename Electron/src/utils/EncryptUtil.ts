import jwt from 'jsonwebtoken';
import * as crypto from "crypto";

type JWT = {
    privateId: number
    name: string
    iat: number
    exp: number
}

export default class EncryptUtil {
    static createJWT(id: string, passkey: string): string {
        const data: JWT = {
            privateId: passkey.length,
            name: id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }
        return jwt.sign(data, "1573")
    }

    static decodeJWT(token: string) {
        try {
            const decoded = jwt.verify(token, "1573") as JWT;
            console.log(decoded);
            return decoded;
        } catch (error) {
            console.error("토큰 검증에 실패했습니다:", error);
            return null;
        }
    }

    static sha256(data: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }
}