import {BidItem, Client, httpMethod, iBidItem} from "../common/tpye";
import {APIResponse} from "./APIResponse";
import {Indicator} from "../common/Indicator";

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

    init = async (id: string, fileName: string, youtubeUrl: string) => {
        const body = {
            id,
            fileName,
            youtubeUrl
        }

        return await this.request<BidItem[]>("/bid/init", body)
    }
    isInit = async () => {
        return await this.request<BidItem[]>("/bid/isInit")
    }

    /**데이터 리로드**/
    changeFileName = async () => {
        return await this.request<any>("/data/fileId")
    }

    /**아이템 추가,수정,삭제 */
    getBidItems = async () => {
        return await this.request<BidItem[]>("/data/list")
    }

    addBidItem = async (item: BidItem) => {
        const body = {
            item
        }

        return await this.request<BidItem[]>("/data/add", body)
    }
    removeBidItem = async (index: number) => {
        const body = {
            index
        }

        return await this.request<BidItem[]>("/data/remove", body)
    }

    modifyBidItem = async (index: number, item: iBidItem) => {
        const body = {
            index,
            item
        }

        return await this.request<BidItem[]>("/data/modify", body)
    }

    addClient = async (index: number, client: Client) => {
        const body = {
            index,
            client
        }

        return await this.request<BidItem[]>("/data/addClient", body)
    }

    /**경매 시작,멈춤*/
    startBid = async (index: number) => {
        const body = {
            index
        }

        return await this.request<BidItem[]>("/bid/start", body)
    }
    endBid = async (index: number) => {
        const body = {
            index
        }

        return await this.request<BidItem[]>("/bid/end", body)
    }
    sendMessage = async (message: string) => {
        const body = {
            message
        }
        return await this.request<BidItem[]>("/bid/message", body)
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