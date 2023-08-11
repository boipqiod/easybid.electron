import {useBid} from "../../hook/useBid";
import {useEffect, useState} from "react";
import {BidItem, SSESender, SSEType} from "../../common/tpye";

export const UserList = () =>{
    const {bidItems, setBidItems, onSaleIndex} = useBid()

    const [eventSource, setEventSource] = useState<EventSource>()

    useEffect(()=>{
        if(eventSource) return

        const _eventSource = new EventSource('http://localhost:3000/sse/events')
        _eventSource.addEventListener('message', messageListenerMain)
        setEventSource(_eventSource)
        console.log("SSE INIT", eventSource)
    },[])

    useEffect(() => {
        // 이전 이벤트 리스너 제거
        eventSource?.removeEventListener('message', messageListenerMain);
        // 새 이벤트 리스너 추가
        eventSource?.addEventListener('message', messageListenerMain)
        return () => {
            eventSource?.removeEventListener('message', messageListenerMain)
        }
    }, [bidItems])

    const messageListenerMain = (event: MessageEvent<string>) => {

        const data = JSON.parse(event.data) as { data: SSESender }
        const sseSender = data.data
        console.log("sseSender", sseSender)

        switch (sseSender.type) {
            case SSEType.setItems: {
                const data = sseSender.data as { items: BidItem[] }
                setBidItems(data.items)
                return;
            }
            default:
                return

        }
    }


    const item = (index: number) =>{ 
        return (
            <h1 className="col-4" key={index}>
                {`${bidItems[onSaleIndex].clients[index].name}님 ${bidItems[onSaleIndex].clients[index].amount}개`}
            </h1>
        )
    }

    return (
        <div style={{backgroundColor: "green"}}  className="vw-100 vh-100 d-flex justify-content-center align-items-center flex-column green row">
                <div className="row text-center">
                    {
                        bidItems[onSaleIndex].clients.map((value, index)=>{
                            return item(index)
                        })
                    }
                </div>
        </div>
    )
}