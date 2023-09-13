import {APIResponse} from "./APIResponse";
import {Indicator} from "../utils/Indicator";

export class ElectronAPI {
    static get instance(): ElectronAPI {
        if (!ElectronAPI._instance) {
            ElectronAPI._instance = new ElectronAPI();
        }
        return ElectronAPI._instance;
    }

    private static _instance: ElectronAPI;

    private constructor() {
    }

    //요청 보내기
    async request<T>(url: string, data?: any): Promise<APIResponse<T | undefined>> {
        Indicator.instance.setIndicator(true)

        try {
            const res = await window.data.request(url, data);
            console.log(
                "\nAPI Request\n",
                url,
                "\nResponse \n",
                res as T
            )

            Indicator.instance.setIndicator(false)
            return res as APIResponse<T>
        } catch (e) {
            console.warn(
                "\nAPI Request\n",
                url,
                "\nError \n",
                e
            )
            Indicator.instance.setIndicator(false)
            return {success: false} as APIResponse<undefined>
        }

    }


    /**로그인 */
    login = async (id: string, passkey: string) => {
        const body = {
            id,
            passkey
        }

        return await this.request<{token: string}>("/auth/login", body)
    }
}