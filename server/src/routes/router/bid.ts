import {Router} from "express";
import {APIResponse} from "../../model/response";
import {BidItem} from "../../common/tpye";
import BidController from "../../controllers/BidController";

const router = Router()

router.post('/init',  async (req, res) => {
    const data = req.body as {id: string, fileName: string, youtubeUrl: string}
    const isInit = await BidController.init(data.id, data.fileName, data.youtubeUrl)

    if(!isInit.success){
        res.send(APIResponse.getRes(false, isInit.error))
        return
    }

    const bidList = BidController.shared.getBidItems()
    res.send(APIResponse.getRes(true, bidList))
})

router.post('/start', async (req, res) => {
    const data = req.body as {index: number}

    const item = await BidController.shared.startBid(data.index)
    res.send(APIResponse.getRes(true, item))
})
router.post('/end', async (req, res) => {
    const data = req.body as {index: number}

    const item = await BidController.shared.endBid(data.index)
    res.send(APIResponse.getRes<BidItem[]>(true, item))
})

router.get('/now',async (req, res)=>{
    const now = BidController.shared.bidNow()
    res.send(now)
})

router.get('/isInit', async (req, res)=>{
    const isInit = BidController.shared.isInit
    const items = BidController.shared.bidItems
    res.send(APIResponse.getRes<BidItem[]>(isInit, isInit ? items : []))
})

//물건이 판매됨
router.post('/sale', async (req, res) => {
    const data = req.body as { lastChatId: string, data:{name: string, message: number}[] }
    console.log("sale", data)
    BidController.shared.lastChatId = data.lastChatId

    data.data.forEach(value => {
        BidController.shared.saleItemByNow(value.name, value.message)
    })

    res.send(true)
})

export default router