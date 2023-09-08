import {BidItem, BidStatus, Client} from "../common/tpye";
import BidService from "../service/BidService";
import {ChatController} from "./ChatController";
import {BrowserController} from "./BrowserController";
import {Utils} from "../common/Utils";

export default class BidController {
    id: string
    private service: BidService

    bidItems: BidItem[] = []
    lastChatId: string | undefined = undefined
    saleIndex: number = -1

    isInit: boolean = false

    static shared = new BidController("unknown", "unknown")

    private timer: NodeJS.Timer | undefined

    static init = async (id: string, fileName: string, url: string) => {
        try {
            BidController.shared.init(id, fileName)

            if (ChatController.shared.url !== url) await ChatController.shared.loadPage(url)

            await BidController.shared.reloadBidItems()
            if (BidController.shared.saleIndex !== -1) BidController.shared.startTimer(BidController.shared.saleIndex)

            BidController.shared.isInit = true

            return {success: true, error: null}
        } catch (e) {
            return {success: false, error: e ?? "error"}
        }
    }

    init = (id: string, fileName: string) =>{
        this.id = id
        this.service = new BidService(id, fileName)
    }

    constructor(id: string, fileName: string) {
        this.id = id
        this.service = new BidService(id, fileName)
    }

    //서버에 아이템 저장하기
    private saveBidItemsToServer = async () => {
        await this.service.saveBidData(this.bidItems)
    }
    //서버에서 아이템 져오기
    private getBidItemsFromServer = async () => {
        return await this.service.getBidData()
    }

    //비드 아이템 반환
    getBidItems = (): BidItem[] => {
        return this.bidItems
    }

    reloadBidItems = async (): Promise<BidItem[]> => {
        this.bidItems = await this.getBidItemsFromServer()
        console.log("reloadBidItems", this.bidItems)
        this.saleIndex = this.bidItems.findIndex(value => value.status === BidStatus.sale)
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }
    //비드 아이템 추가
    addBidItem = async (data: BidItem) => {
        this.bidItems.push(data)
        console.log("addBidItem", data.name, this.bidItems.length)
        await this.saveBidItemsToServer()
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }

    removeBidItem = async (index: number) => {
        console.log("removeBidItem", index)
        this.bidItems.splice(index, 1)
        await this.saveBidItemsToServer()
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }

    //아이템 수정
    modifyBidItem = async (index: number, data: BidItem) => {
        data.saleAmount = data.clients.reduce((total, client) => total + client.amount, 0)
        this.bidItems[index] = data
        await BrowserController.shared.setItems(this.bidItems)
        await this.saveBidItemsToServer()
        return this.bidItems
    }

    //상품에 구매자 추가
    addClient = async (index: number, client: Client) => {
        const item = this.bidItems[index]
        const findIndex = item.clients.findIndex(v => v.name === client.name)

        //없는 경우
        if (findIndex === -1) {
            item.clients.push({
                name: client.name,
                amount: client.amount
            })
        } else {
            //기구매자에 추가
            item.clients[findIndex].amount += client.amount
        }

        item.saleAmount = item.clients.reduce((total, client) => total + client.amount, 0)
        await BrowserController.shared.setItems(this.bidItems)
        const message = `${client.name}님 "${item.name} [${formatCurrency(item.price)}]" ${client.amount}개 구매 확인되었습니다.`
        this.sendMessage(message)
        await this.saveBidItemsToServer()
        return this.bidItems
    }

    /****경매 진행****/

    startBid = async (index: number) => {
        console.log("startBid", index)
        console.log(this.bidItems[index].name)

        //판매하는 인덱스 스테이트 변경
        this.bidItems[index].status = BidStatus.sale
        await this.saveBidItemsToServer()
        this.saleIndex = index

        //메세지 발송
        const message = `"${this.bidItems[index].name}${this.bidItems[index].price === 0 ? "" : ` (${formatCurrency(this.bidItems[index].price)})`}" 상품의 판매를 시작합니다. 상품을 구매하고 싶은 만큼 숫자로 입력해주세요.`
        this.sendMessage(message, true)
        await BrowserController.shared.startBid(index, this.bidItems)

        await ChatController.shared.getChat()
        this.startTimer(index)

        return this.bidItems
    }

    endBid = async (index: number) => {
        console.log("endBid", index)
        console.log("bidItems", this.bidItems)
        console.log(this.bidItems[index].name)

        //판매 아이템 인덱스 변경
        this.bidItems[index].status = BidStatus.end
        await this.saveBidItemsToServer()

        //메세지 발송
        await BrowserController.shared.endBid(index, this.bidItems)

        let message = `"${this.bidItems[index].name}" 상품 판매가 종료되었습니다. 구매하신분들은 확인해주세요.`

        for (const value of this.bidItems[index].clients) {
            const _message = message + ` (${value.name}님 ${value.amount}개)`
            if(_message.length >= 200) {
                this.sendMessage(message, true)
                message = ""
            }
            message += ` (${value.name}님 ${value.amount}개)`

            await Utils.delay(100)
        }
        this.sendMessage(message, true)

        clearInterval(this.timer)
        this.timer = undefined

        return this.bidItems
    }

    startTimer = (index: number) => {
        console.log("start Timer")
        if(this.timer) clearInterval(this.timer)
        this.timer = setInterval(async () => {

            const chatList = await ChatController.shared.getChat()
            if (chatList.length > 0) console.log(chatList)
            chatList.forEach(chat => {
                this.saleItemByIndex(index, chat.name, chat.message)
            })

        }, 100)
    }

    /****경매 프로스세스****/
    saleItemByIndex = (index: number, name: string, amount: number) => {
        const item = this.bidItems[index]

        //판매 중인 상품이 아닐때 리턴
        if (item.status !== BidStatus.sale) return

        //구매 조건에 따라 수량이 변경되기 위해
        let _amount = amount

        let message = ""

        //최대 판매 개수를 넘어가면 최대치만큼만 판매
        if (item.amount !== 0 && item.amount - item.saleAmount < amount) {
            _amount = item.amount - item.saleAmount
            //판매 메시지 작성
            if (index === this.saleIndex) message = `${name}님 "${item.name} (${formatCurrency(item.price)})" ${_amount}개* 구매 확인되었습니다.`
        } else {
            //판매 메시지 전송
            if (index === this.saleIndex) message = `${name}님 "${item.name} (${formatCurrency(item.price)})" ${_amount}개 구매 확인되었습니다.`
        }

        //판매량 추가
        item.saleAmount += _amount

        const findIndex = item.clients.findIndex(v => v.name === name)

        //없는 경우
        if (findIndex === -1) {
            item.clients.push({
                name,
                amount: _amount
            })
        } else {
            //기구매자에 추가
            item.clients[findIndex].amount += _amount
        }

        this.sendMessage(message)
        this.bidItems[index] = item

        //판매 완료
        if (item.amount !== 0 && item.saleAmount >= item.amount) {
            this.endBid(index).then()
        }

        BrowserController.shared.setItems(this.bidItems).then()
        this.saveBidItemsToServer().then()
    }

    saleItemByNow = (name: string, amount: number) => {
        this.saleItemByIndex(this.saleIndex, name, amount)
    }

    private sendMessage = (message: string, isSendChat: boolean = false) => {
        BrowserController.shared.setMessage(message).then()
        if(isSendChat) ChatController.shared.sendChat(message)
    }

    /**경매 상태**/
    bidNow = () => {
        console.log("bidNow", this.saleIndex, this.lastChatId)
        return {
            onSale: this.saleIndex !== -1,
            saleIndex: this.saleIndex,
            lastChatId: this.lastChatId
        }
    }
}

const formatCurrency = (value: number): string => {
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    });

    return formatter.format(value);
};
