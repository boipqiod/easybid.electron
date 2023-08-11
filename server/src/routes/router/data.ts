import {raw, Router} from "express";
import {BidItem, Client} from "../../common/tpye";
import {APIResponse} from "../../model/response";
import BidController from "../../controllers/BidController";
const router = Router()

router.get('/list', async (req, res) => {
    const items = BidController.shared.getBidItems()
    res.send(APIResponse.getRes(true, items))
})

//추가하기
router.post('/add', async (req, res) => {
    const data = req.body as { item: BidItem }
    const items = await BidController.shared.addBidItem(data.item)
    res.send(APIResponse.getRes(true, items))
})

//삭제하기
router.post('/remove', async (req, res) => {
    const data = req.body as { index: number }
    const items = await BidController.shared.removeBidItem(data.index)
    res.send(APIResponse.getRes(true, items))
})

//수정하기
router.post('/modify',async (req, res) => {
    const data = req.body as { index: number, item: BidItem }
    const items = await BidController.shared.modifyBidItem(data.index, data.item)
    res.send(APIResponse.getRes(true, items))
})

//구매자 추가하기
router.post('/addClient',async (req, res) => {
    const data = req.body as { index: number, client: Client }
    const items = await BidController.shared.addClient(data.index, data.client)
    res.send(APIResponse.getRes(true, items))
})


export default router