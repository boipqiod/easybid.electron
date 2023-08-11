import sse from "../routes/router/sse";
import {Response} from "express";

export default class SSE {
    static shared = new SSE()
    sseList: Response[] = []

    constructor() {
        setInterval(() => {
            this.pushAll({
                type: SSEType.session
            })
        }, 50 * 1000)
    }

    append = (res: Response) => {
        console.log("SSE Append", this.sseList.length)
        this.sseList.push(res)
    }

    remove = (index: number) => {
        this.sseList.splice(index, 1)
    }

    pushAll = (data: SSESender) => {
        console.log("push ALL sse", data)
        this.sseList.forEach(v => {
            this.push(v, data)
        })
    }

    private push = (res: Response, data: SSESender) => {
        res.write(`data: ${JSON.stringify({data})}\n\n`)
    }
}


//SSE 발송용
export interface SSESender {
    type: SSEType
    data?: any
}

export enum SSEType {
    //세션 유지용
    session = "session",
    message = "message",
    sendMessage = "sendMessage",
    startSale = "startSale",
    endSale = "endSale",
    sale = "sale",
    saleClient = "saleClient",
    setItems = "setItems"
}