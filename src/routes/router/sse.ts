import {Router} from "express";
import SSE, {SSEType} from "../../controllers/SSE";
import {APIResponse} from "../../model/response";

const router = Router()

router.get('/events', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    };
    res.writeHead(200, headers);
    const index = SSE.shared.sseList.length -1
    SSE.shared.append(res)

    req.on('close', () => {
        console.log("SSE CLOSE")
        SSE.shared.remove(index)
    });
})

router.post('/sendMessage', (req, res) => {
    const data = req.body as string
    SSE.shared.pushAll({type: SSEType.sendMessage,data: data})
    res.send(APIResponse.getRes(true))
})


export default router