import {SSESender, SSEType} from "../common/tpye";

export default class SSE{

    private baseUrl = "http://localhost:3000"

    constructor(id: string) {
        const eventSource = new EventSource(`${this.baseUrl}?id=${id}`)

        eventSource.addEventListener('message', this.messageListener)
    }

    private messageListener = (event: MessageEvent<SSESender>) =>{
        const sseSender = event.data
        const data = sseSender.data

        switch (sseSender.type){
            case SSEType.endSale:

                break
            case SSEType.sale:
                break
            case SSEType.saleClient:
                break
            //아무것도 안함
            case SSEType.startSale:
            case SSEType.session:
            default: return;

        }
    }
}
