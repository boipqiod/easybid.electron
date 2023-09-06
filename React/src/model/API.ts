import axios, {AxiosRequestConfig} from "axios"
import {APIResponse} from "./APIResponse";
import {ApiConfig, BidItem, Client, httpMethod, iBidItem} from "../utils/tpye";
import {Indicator} from "../utils/Indicator";


export default class API {

    static shared: API = new API()
    private axios

    constructor() {
        this.axios = axios.create({
            baseURL: `http://localhost:3000`
        })
    }
    private setConfig = <T>(apiConfig: ApiConfig, data: T): AxiosRequestConfig => {
        const config: AxiosRequestConfig = {
            method: apiConfig.method,
            url: `${apiConfig.url}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (apiConfig.method === httpMethod.get) config.params = data
        else config.data = data

        return config
    }

    /**
     * 요청을 보내는 모듈
     * @param apiConfig
     * @param data
     */
    private request = async <T>(apiConfig: ApiConfig, data?: any) => {

        Indicator.instance.setIndicator(true)
        const config = this.setConfig(apiConfig, data)

        try {
            const res = await this.axios.request(config)
            console.log(
                "\nAPI Request\n",
                config,
                "\nResponse \n",
                res.data as T
            )

            Indicator.instance.setIndicator(false)
            return res.data as APIResponse<T>
        } catch (e) {
            console.warn(
                "\nAPI Request\n",
                config,
                "\nError \n",
                e
            )
            Indicator.instance.setIndicator(false)
            return {success: false} as APIResponse<undefined>
        }
    }

    //초기화
    init = async (id: string, fileName: string, youtubeUrl: string) => {
        const config = {
            method: httpMethod.post,
            url: "/bid/init"
        }
        const body = {
            id,
            fileName,
            youtubeUrl
        }

        return await this.request<BidItem[]>(config, body)
    }
    isInit = async () =>{
        const config = {
            method: httpMethod.get,
            url: "/bid/isInit"
        }

        return await this.request<BidItem[]>(config)
    }

    /**데이터 리로드**/
    changeFileName = async () => {
        const config = {
            method: httpMethod.post,
            url: "/data/fileId"
        }

        return await this.request<any>(config)
    }

    /**아이템 추가/수정/삭제 */
    getBidItems = async () => {
        const config = {
            method: httpMethod.get,
            url: "/data/list"
        }

        return await this.request<BidItem[]>(config)
    }

    addBidItem = async (item: BidItem) => {
        return await this.request<BidItem[]>(
            {
                method: httpMethod.post,
                url: "/data/add"
            },
            {item})
    }
    removeBidItem = async (index: number) => {
        const config = {
            method: httpMethod.post,
                url: "/data/remove"
        }
        const body = {
            index
        }

        return await this.request<BidItem[]>(config,body)
    }

    modifyBidItem = async (index: number, item: iBidItem) => {
        const config = {
            method: httpMethod.post,
            url: "/data/modify"
        }
        const body = {
            index,
            item
        }

        return await this.request<BidItem[]>(config, body)
    }

    addClient = async (index: number, client: Client) => {
        const config = {
            method: httpMethod.post,
            url: "/data/addClient"
        }
        const body = {
            index,
            client
        }

        return await this.request<BidItem[]>(config, body)
    }

    /**경매 시작/멈춤*/
    startBid = async (index: number) => {
        const config = {
            method: httpMethod.post,
            url: "/bid/start"
        }
        const body = {
            index
        }

        return await this.request<BidItem[]>(config, body)
    }
    endBid = async (index: number) => {
        const config = {
            method: httpMethod.post,
            url: "/bid/end"
        }
        const body = {
            index
        }

        return await this.request<BidItem[]>(config, body)
    }

    login = async (id: string) =>{
        const config = {
            method: httpMethod.post,
            url: "/auth/login"
        }
        const body = {
            id
        }

        return await this.request<boolean>(config, body)
    }
}

const setIndicator = (set: boolean) =>{

}