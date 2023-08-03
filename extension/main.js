import SSE from "./sse.js";
import messageController from './MessageController.js'

const init = async () =>{

    sseInit()
    await messageController.init(
        document.querySelector("#input-container #input #input"),
        document.querySelector("#send-button button")
    )
}

const sseInit = () =>{
    SSE.initSSE((e)=>{

        try {
            let receivedData = JSON.parse(e.data)
            receivedData = receivedData.data

            console.log("sse receivedData", receivedData)

            switch (receivedData.type){
                case SSE.sseType.session: return
                case SSE.sseType.message:
                    messageController.pushMessage(receivedData.data)
                    return
                case SSE.sseType.startSale:
                    messageController.startGetChat()
                    return
                case SSE.sseType.endSale:
                    messageController.endGetChat()
                    return
            }
        }catch (e){

            console.log("sse error", e)

        }

    })
}

init().then(() => {
    console.log("init complete")
})