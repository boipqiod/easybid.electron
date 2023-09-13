import {BidItem, Client, iBidItem} from "../utils/tpye";
import {ElectronAPI} from "../model/ElectronAPI";

export default class BidService {

    static init = async (id: string, fileName: string, youtubeUrl: string) => {
        const body = {
            id,
            fileName,
            youtubeUrl
        }

        return await ElectronAPI.instance.request<BidItem[]>("/bid/init", body)
    }
    static isInit = async () => {
        return await ElectronAPI.instance.request<BidItem[]>("/bid/isInit")
    }

    /**데이터 리로드**/
    static changeFileName = async () => {
        return await ElectronAPI.instance.request<any>("/data/fileId")
    }

    /**아이템 추가,수정,삭제 */
    static getBidItems = async () => {
        return await ElectronAPI.instance.request<BidItem[]>("/data/list")
    }

    static addBidItem = async (item: BidItem) => {
        const body = {
            item
        }

        return await ElectronAPI.instance.request<BidItem[]>("/data/add", body)
    }
    static removeBidItem = async (index: number) => {
        const body = {
            index
        }

        return await ElectronAPI.instance.request<BidItem[]>("/data/remove", body)
    }

    static modifyBidItem = async (index: number, item: iBidItem) => {
        const body = {
            index,
            item
        }

        return await ElectronAPI.instance.request<BidItem[]>("/data/modify", body)
    }

    static addClient = async (index: number, client: Client) => {
        const body = {
            index,
            client
        }

        return await ElectronAPI.instance.request<BidItem[]>("/data/addClient", body)
    }

    /**경매 시작,멈춤*/
    static startBid = async (index: number) => {
        const body = {
            index
        }

        return await ElectronAPI.instance.request<BidItem[]>("/bid/start", body)
    }
    static endBid = async (index: number) => {
        const body = {
            index
        }

        return await ElectronAPI.instance.request<BidItem[]>("/bid/end", body)
    }
    static sendMessage = async (message: string) => {
        const body = {
            message
        }
        return await ElectronAPI.instance.request<BidItem[]>("/bid/message", body)
    }
}