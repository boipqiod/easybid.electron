import {BidItem, httpMethod} from "../common/tpye";
import API from "../model/API";
import {request} from "../model/apiTypes";

export default class BidService {

    //저장할 파일 이름
    private readonly id: string
    private readonly fileName: string

    constructor(id: string, fileName: string) {
        this.id = id
        this.fileName = fileName
    }

    saveBidData = async (data: BidItem[]) => {
        const body = {
            data: data,
            ebId: this.id,
            fileName: this.fileName
        }
        const config = {
            method: httpMethod.post,
            url: "/data/save"
        }

        await API.shared.request<request, boolean>(config, body)
    }

    getBidData = async (): Promise<BidItem[]> => {
        const body = {
            ebId: this.id,
            fileName: this.fileName
        }
        const config = {
            method: httpMethod.get,
            url: "/data/load"
        }

        const res = await API.shared.request<request, BidItem[]>(config, body)
        return res.data ?? []
    }

}