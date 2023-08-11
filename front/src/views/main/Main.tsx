import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {MainHeader} from './components/MainHeader';
import {MainAdder} from './components/MainAdder';
import {MainTable} from "./components/Table/MainTable";
import {MainModifyModal} from "./components/Modals/MainModifyModal";
import {useBid} from "../../hook/useBid";
import Storage from "../../Utils/Storage";
import {MainAddClientModal} from "./components/Modals/MainAddClientModal";
import {MainFooter} from "./components/MainFooter";
import {BidItem, SSESender, SSEType} from "../../common/tpye";
import {MainText} from "./components/Text/MainText";
import {useCopyText} from "../../hook/useCopyText";

export const Main: React.FC = () => {
    const {modifyIndex, addClientIndex, bidItems, setBidItems, bidEnded} = useBid()
    const {appendText} = useCopyText()
    const fileName = Storage.getFileName()
    const url = Storage.getYoutubeUrl()

    const [eventSource, setEventSource] = useState<EventSource>()

    useEffect(()=>{
        const _eventSource = new EventSource('http://localhost:3000/sse/events')
        setEventSource(_eventSource)
        console.log("SSE INIT", _eventSource)
    },[])

    useEffect(() => {
        // 이전 이벤트 리스너 제거
        eventSource?.removeEventListener('message', messageListenerMain)
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
            case SSEType.endSale: {
                const data = sseSender.data as { items: BidItem[], index: number }
                setBidItems(data.items)
                bidEnded(data.index)
                return
            }
            //상품 판매
            case SSEType.setItems: {
                const data = sseSender.data as { items: BidItem[] }
                setBidItems(data.items)
                return
            }
            case SSEType.message:{
                const data = sseSender.data as string
                appendText(data)
                return
            }
            case SSEType.session: default: return
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center vw-100">
            <div style={{width: "800px"}} className="d-flex flex-column justify-content-center text-center mb-5">
                <MainHeader/>

                {
                    fileName && fileName !== "" && url && url !== "" &&
                    <>
                        <MainAdder/>
                        <MainTable/>
                        <MainText />
                        <MainFooter/>
                    </>
                }
            </div>

            {
                modifyIndex !== -1 &&
                <MainModifyModal />
            }

            {
                addClientIndex !== -1 &&
                <MainAddClientModal />
            }

        </div>
    )

}