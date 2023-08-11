import React, {useEffect, useState} from "react";
import {useBid} from "../../hook/useBid";
import Utils from "../../Utils/Utils";
import {BidItem, DisplaySetting, SSESender, SSEType} from "../../common/tpye";
import Storage from "../../Utils/Storage";

export const Display:React.FC = () =>{

    const {bidItems, setBidItems, onSaleIndex, setOnSaleIndex} = useBid()

    const [eventSource, setEventSource] = useState<EventSource>()
    const [setting, setSetting] = useState<DisplaySetting>()

    useEffect(()=>{
        console.log(onSaleIndex)

        const _eventSource = new EventSource('http://localhost:3000/sse/events')
        _eventSource.addEventListener('message', messageListenerMain)
        setEventSource(_eventSource)
        console.log("SSE INIT", eventSource)

        initDisplaySetting()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'setting' && e.newValue) {
                const _setting = JSON.parse(e.newValue) as DisplaySetting
                setSetting(_setting)
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            _eventSource.removeEventListener('message', messageListenerMain)
            _eventSource.close()
        };

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

    const initDisplaySetting = () =>{
        const _setting = Storage.getSetting()
        if(_setting) {
            setSetting(_setting)
        }else{
            const settingInit: DisplaySetting = {
                product: {
                    size: 100,
                    color: "#000000"
                },
                client: {
                    size: 100,
                    color: "#000000"
                },
            }
            setSetting(settingInit)
        }
    }

    const messageListenerMain = (event: MessageEvent<string>) => {

        const data = JSON.parse(event.data) as { data: SSESender }
        const sseSender = data.data
        console.log("sseSender", sseSender)

        switch (sseSender.type) {
            case SSEType.startSale:{
                const data = sseSender.data as { items: BidItem[], index: number }
                setOnSaleIndex(data.index)
                setBidItems(data.items)
                return
            }
            case SSEType.endSale:{
                const data = sseSender.data as { items: BidItem[], index: number }
                setOnSaleIndex(-1)
                setBidItems(data.items)
                return;
            }
            case SSEType.setItems: {
                const data = sseSender.data as { items: BidItem[] }
                setBidItems(data.items)
                return;
            }
            case SSEType.session:
            default:
                return

        }
    }

    const item = (index: number) =>{
        return (
            <h1 style={{fontSize: setting?.client.size, color: setting?.client.color}} className="col-3" key={index}>
                {`${bidItems[onSaleIndex].clients[index].name}님 ${bidItems[onSaleIndex].clients[index].amount}개`}
            </h1>
        )
    }


    return(
        <div style={{backgroundColor: "green"}} className="vw-100 vh-100 d-flex justify-content-center align-items-center flex-column">
            {
                onSaleIndex !== -1 &&

                <>
                    <div className="justify-content-center align-items-center flex-column mb-5">
                        <h1 style={{fontSize: setting?.product.size, color: setting?.product.color}}>{bidItems[onSaleIndex].name}</h1>
                        <h1 style={{fontSize: setting?.product.size, color: setting?.product.color}}>{Utils.formatCurrency(bidItems[onSaleIndex].price)}</h1>
                    </div>
                    <div className="row w-100 text-center">
                        {
                            bidItems[onSaleIndex].clients.map((value, index)=>{
                                return item(index)
                            })
                        }
                    </div>

                </>
            }
        </div>
    )
}