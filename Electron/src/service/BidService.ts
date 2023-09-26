import {BidItem, httpMethod} from "../utils/tpye";
import API from "../model/API";
import {request} from "../model/apiTypes";
import {FireStoreUtil} from "../utils/FireStoreUtil";

export default class BidService {

    //저장할 파일 이름
    private readonly id: string
    private readonly fileName: string

    constructor(id: string, fileName: string) {
        this.id = id
        this.fileName = fileName
    }

    saveBidData = async (items: BidItem[]) => {
        try {
            // const data: string[] = []
            // items.forEach(item => {
            //     data.push(JSON.stringify(item))
            // })
            await FireStoreUtil.instance.setDoc(this.id, `bid_${this.fileName}`, {data: items})
        }catch (e) {
            console.log(e)
        }
    }

    getBidData = async (): Promise<BidItem[]> => {
        const res = await FireStoreUtil.instance.ensureDocWithDefaults(this.id, `bid_${this.fileName}`)

        const data: BidItem[] = res
        try {
            return data
        }catch (e) {
            console.log("getBidData", e)
            return []
        }
    }
}