import {APIResponse} from "./APIResponse";
import {Indicator} from "../utils/Indicator";

export class API {
    static get instance(): API {
        if (!API._instance) {
            API._instance = new API();
        }
        return API._instance;
    }

    private static _instance: API;

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

}