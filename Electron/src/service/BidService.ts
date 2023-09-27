import {BidItem} from "../utils/tpye";
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
            await FireStoreUtil.instance.setDoc(this.id, `bid_${this.fileName}`, {data: items})
        }catch (e) {
            console.log(e)
        }
    }

    getBidData = async (): Promise<BidItem[]> => {
        const data: BidItem[] = await FireStoreUtil.instance.ensureDocWithDefaults(this.id, `bid_${this.fileName}`)
        try {
            return data
        }catch (e) {
            console.log("getBidData", e)
            return []
        }
    }
}