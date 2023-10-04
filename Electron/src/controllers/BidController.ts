import BidService from "../service/BidService";
import {ChatController} from "../common/ChatController";
import {BrowserController} from "../common/BrowserController";
import {BidItem, BidStatus, Client} from "../utils/tpye";
import {Utils} from "../utils/Utils";
import ProductController from "./ProductController";

export default class BidController {
    id: string
    private service: BidService

    bidItems: BidItem[] = []
    lastChatId: string | undefined = undefined
    saleIndex: number = -1

    isInit: boolean = false

    static shared = new BidController("unknown", "unknown")

    private timer?: NodeJS.Timeout

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
        console.log("####reloadBidItems", this.bidItems)
        this.saleIndex = this.bidItems.findIndex(value => value.status === BidStatus.sale)
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }
    //비드 아이템 추가
    addBidItem = async (data: BidItem) => {
        this.bidItems.push(data)
        console.log("####addBidItem", data)
        await this.saveBidItemsToServer()
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }

    removeBidItem = async (index: number) => {

        const item = {...this.bidItems[index]} as BidItem
        console.log("####removeBidItem", index, item)
        //판매된 상품이면 상품 수량 복구
        const saleAmount = item.clients.reduce((total, client) => total + client.amount, 0)
        await ProductController.shared.unSaleProduct(item.productId, saleAmount, item.saleProductCount)

        this.bidItems.splice(index, 1)
        await this.saveBidItemsToServer()
        await BrowserController.shared.setItems(this.bidItems)
        return this.bidItems
    }

    //아이템 수정
    modifyBidItem = async (index: number, updatedData: BidItem) => {
        const originalData = { ...this.bidItems[index] };


        // 클라이언트별로 구매 수량 합계
        const calculateTotalAmount = (clients: Client[]) => clients.reduce((total, client) => total + client.amount, 0);
        
        //수정된 상품의 총 구매 수량
        const currentAmount = calculateTotalAmount(updatedData.clients);

        //판매 중이지 않은 상품이라면 재고 수량 변경 바로 적용
        if(index !== this.saleIndex) {
            console.log("####modifyBidItem")
            //재고 상품
            const product=  ProductController.shared.productList.find(item => item.id === originalData.productId)
            if(!product) return this.bidItems;

            //원래 상품의 총 구매 수량
            const previousAmount = calculateTotalAmount(originalData.clients);

            //재고의 수량 + (원래 상품의 총 구매 수량 * 원래 상품의 판매 수량) = 총 재고 수량
            const previousProductAmount = product.amount + (originalData.saleProductCount * previousAmount);

            //총 재고 수량 - (수정된 상품의 총 구매 수량 * 수정된 상품의 판매 수량) = 새로운 재고의 수량
            product.amount = previousProductAmount - (updatedData.saleProductCount * currentAmount)

            await ProductController.shared.modifyProductData(product)
            await BrowserController.shared.setProductList(ProductController.shared.productList)
        }

        //저장 및 브라우저에 반영
        updatedData.saleAmount = currentAmount;

        console.log("####modifyBidItem", index, this.saleIndex, updatedData, originalData)
        this.bidItems[index] = updatedData
        await BrowserController.shared.setItems(this.bidItems);
        await this.saveBidItemsToServer();
        return this.bidItems;
    }
    //상품에 구매자 추가
    addClient = async (index: number, clients: Client[]) => {
        const item = this.bidItems[index]

        for (const client of clients) {
            const findIndex = item.clients.findIndex(v => v.name === client.name)

            //없는 경우
            if (findIndex === -1) {
                item.clients.push({
                    name: client.name,
                    amount: client.amount,
                    note: client.note
                })
            } else {
                //기구매자에 추가
                item.clients[findIndex].amount += client.amount
            }

            const price = item.price === 0 ? "" : ` [${formatCurrency(item.price)}]`
            console.log("####addClient", price)
            const message = `${client.name}님 "${item.name}${price}" ${client.amount}개 구매 확인되었습니다.`
            this.sendMessage(message, index !== this.saleIndex)
        }
        if(index !== this.saleIndex){
            const amount = clients.reduce((total, client) => total + client.amount, 0)
            ProductController.shared.saleProduct(item.productId, amount, item.saleProductCount).then().catch(e => console.log(e))
            BrowserController.shared.setProductList(ProductController.shared.productList).then()
        }

        item.saleAmount = item.clients.reduce((total, client) => total + client.amount, 0)
        console.log("####addClient", index, item, this.bidItems[index])
        await BrowserController.shared.setItems(this.bidItems)
        await this.saveBidItemsToServer()
        return this.bidItems
    }

    /****경매 진행****/
    startBid = async (index: number) => {

        //경매가 재시작인 경우
        if(this.bidItems[index].status === BidStatus.end) {
            //재고량 복구
            const item = {...this.bidItems[index]} as BidItem
            const saleAmount = item.clients.reduce((total, client) => total + client.amount, 0)
            await ProductController.shared.unSaleProduct(item.productId, saleAmount, item.saleProductCount)
            await BrowserController.shared.setProductList(ProductController.shared.productList)
        }

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

        //판매 아이템 인덱스 변경
        this.bidItems[index].status = BidStatus.end
        await this.saveBidItemsToServer()
        this.saleIndex = -1

        await BrowserController.shared.endBid(index, this.bidItems)
        const item = {...this.bidItems[index]} as BidItem
        const saleAmount = item.clients.reduce((total, client) => total + client.amount, 0)
        await ProductController.shared.saleProduct(this.bidItems[index].productId, saleAmount, item.saleProductCount)
        BrowserController.shared.setProductList(ProductController.shared.productList).then()

        console.log("####endBid", index, this.bidItems[index])

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
        const price = item.price === 0 ? "" : ` [${formatCurrency(item.price)}]`
        //최대 판매 개수를 넘어가면 최대치만큼만 판매
        if (item.amount !== 0 && item.amount - item.saleAmount < amount) {
            _amount = item.amount - item.saleAmount
            //판매 메시지 작성
            if (index === this.saleIndex) message = `${name}님 "${item.name}${price}" ${_amount}개* 구매 확인되었습니다.`
        } else {
            //판매 메시지 전송
            if (index === this.saleIndex) message = `${name}님 "${item.name}${price}" ${_amount}개 구매 확인되었습니다.`
        }

        //판매량 추가
        item.saleAmount += _amount

        const findIndex = item.clients.findIndex(v => v.name === name)

        //없는 경우
        if (findIndex === -1) {
            item.clients.push({
                name,
                amount: _amount,
                note: ""
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
