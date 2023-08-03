import {Router} from "express";
import {APIResponse} from "../../model/response";
import AuthService from "../../service/AuthService";

const router = Router()

router.post('/login', async (req, res) => {
    const data = req.body as {id: string}
    const authResponse = await AuthService.shared.login(data.id)
    res.send(APIResponse.getRes(true, authResponse))
})

export default router