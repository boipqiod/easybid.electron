import {useContext} from "react"
import {BidContext} from "../context/BidProvider"
import {useAlert} from "./utils/useAlert";
import StorageUtil from "../utils/StorageUtil";
import {BidItem, BidStatus, Client} from "../utils/tpye";
import BidService from "../service/BidService";
import {useAuth} from "./useAuth";

export const useBid = () =>{
    const context = useContext(BidContext)
    const {
        bidItems, setBidItems,
        onSaleIndex, setOnSaleIndex,
        addClientIndex, setAddClientIndex,
        modifyIndex, setModifyIndex,
        init, setInit,
        setting, setSetting,
        isAddProduct, setIsAddProduct,
    } = context
    const {ebId} = useAuth()
    const {showAlert, showConfirm} = useAlert()

    const addItem = async (item: BidItem) =>{

        if(item.productId === ""){
            await showAlert("상품을 선택해주세요.")
            return
        }

        if(item.name === ""){
            await showAlert("이름을 입력해주세요.")
            return
        }

        const res = await BidService.addBidItem(item)
        if(res.success && res.data){
            setBidItems(res.data)
        }else{
            await showAlert(`상품 추가 실패 실패`)
        }
    }

    const removeItem = async (index: number) =>{
        if(onSaleIndex === index) {
            await showAlert("판매중인 상품은 삭제할 수 없습니다.")
            return
        }
        if(bidItems[index].status === BidStatus.end){
            const bool = await showConfirm(`이미 판매가 완료된 상품입니다. 진짜 삭제하시겠습니까?`)
            if(!bool) return
        }else{
            const bool = await showConfirm(`[${bidItems[index].name}] 상품이 삭제됩니다.`)
            if(!bool) return
        }
        const res = await BidService.removeBidItem(index)
        if(res.success && res.data){
            setBidItems(res.data)
            await showAlert("삭제되었습니다.")
        }else{
            await showAlert(`실패`)
        }
    }

    const modifyItem = async (item: BidItem) =>{
        if(item.name === ""){
            await showAlert("이름을 입력해주세요.")
            return
        }

        const index = item.clients.findIndex(v=>v.name==="")
        if(index !== -1) {
            await showAlert("사용자 이름을 확인해주세요")
            return
        }

        const bool = await showConfirm(`[${bidItems[modifyIndex].name}] 상품이 수정됩니다.`)
        if(!bool) return


        const res = await BidService.modifyBidItem(modifyIndex, item)
        if(res.success && res.data){
            setBidItems(res.data)
            await showAlert("수정되었습니다.")
        }else{
            await showAlert(`실패`)
        }
    }
    const addClient = async (client: Client) =>{
        const res = await BidService.addClient(addClientIndex, client)
        if(res.success && res.data){
            setBidItems(res.data)
            await showAlert("추가되었습니다.")
            setAddClientIndex(-1)
        }else{
            await showAlert(`실패`)
        }
    }

    const getBidItems = async () =>{
        const res = await BidService.getBidItems()
        if(!res.success || !res.data) return

        setBidItems(res.data)
    }

    const startBid = async (index: number) =>{
        if(onSaleIndex !== -1) {
            await showAlert("이미 판매 중인 상품이 있습니다.")
            return
        }
        const item = bidItems[index]
        const bool = await showConfirm(`[${item.name}] 상품 판매를 시작합니다.`)
        if(!bool) return

        const res = await BidService.startBid(index)

        if(res.success && res.data){
            setBidItems(res.data)
            setOnSaleIndex(index)
        }else{
            await showAlert(`실패`)
        }
    }

    const endBid = async (index: number) =>{
        const item = bidItems[index]
        const bool = await showConfirm(`[${item.name}] 상품 판매를 종료합니다.`)
        if(!bool) return
        const res = await BidService.endBid(index)

        if(res.success && res.data){
            setBidItems(res.data)
            setOnSaleIndex(-1)
        }else{
            await showAlert(`실패`)
        }
    }

    const bidEnded = (index: number) =>{
        setOnSaleIndex(-1)
        const item = bidItems[index]
        if(item) showAlert(`[${item.name}] 상품 경매가 종료되었습니다.`).then()
    }

    const restartBid = async (index: number) =>{
        if(onSaleIndex !== -1) {
            await showAlert("이미 판매 중인 상품이 있습니다.")
            return
        }
        const item = bidItems[index]

        if(item.amount !== 0 && item.saleAmount >= item.amount) {
            await showAlert("더 판매 가능한 상품이 없습니다.")
            return
        }

        const bool = await showConfirm(`[${item.name}] 상품 판매를 재시작합니다.`)
        if(!bool) return
        const res = await BidService.startBid(index)

        if(res.success && res.data){
            setBidItems(res.data)
            setOnSaleIndex(index)
        }else{
            await showAlert(`실패`)
        }
    }

    const initBid = async (fileName: string, youtubeUrl: string) =>{

        if(fileName === "" || youtubeUrl === ""){
            await showAlert("경매 이름과 유튜브 채팅 주소를 확인해주세요.")
            return false
        }

        if(!youtubeUrl.includes("live_chat")){
            await showAlert("유튜브 채팅 주소를 확인해주세요.")
            return false
        }

        if(fileName === "auth" || fileName === "product"){
            await showAlert("사용할 수 없는 이름입니다.")
            return false
        }

        const res = await BidService.init(ebId, fileName, youtubeUrl)
        if(res.success && res.data){
            StorageUtil.saveFileName(fileName)
            StorageUtil.saveYoutubeUrl(youtubeUrl)
            setBidItems(res.data)
            setInit(true)
            return true
        }
        return false
    }

    return{
        bidItems, setBidItems,
        modifyIndex, setModifyIndex,
        addClientIndex, setAddClientIndex,
        onSaleIndex, setOnSaleIndex,

        setting, setSetting,
        isAddProduct, setIsAddProduct,

        init, setInit,
        addItem,
        getBidItems,
        removeItem,
        modifyItem,
        addClient,

        initBid,
        startBid,
        endBid,
        restartBid,
        bidEnded
    }
}
