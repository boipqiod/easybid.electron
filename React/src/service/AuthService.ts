import {API} from "../model/API";

export default class AuthService{
    static login = async (id: string, passkey: string) => {
        const body = {
            id,
            passkey
        }

        return await API.instance.request<{token: string}>("/auth/login", body)
    }
    static isLogin = async () => {
        return await API.instance.request<boolean>("/auth/isLogin")
    }
}