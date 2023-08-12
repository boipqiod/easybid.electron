import {contextBridge, ipcRenderer} from 'electron'
import {BidItem} from "../common/tpye";

contextBridge.exposeInMainWorld('bid', {
    setItems: (bidItems: BidItem[]) =>{
        localStorage.setItem("bidItems", JSON.stringify(bidItems))
    },
    addItem: (bidItem: BidItem) =>{
        const data = localStorage.getItem("bidItems")
        if(data) {
            const items = JSON.parse(data) as BidItem[]
            localStorage.setItem("bidItems", JSON.stringify([...items, bidItem]))
        }else{
            localStorage.setItem("bidItems", JSON.stringify([bidItem]))
        }
    },
    setSaleIndex: (index: number, isStart: boolean)=>{
        localStorage.setItem("saleIndex", JSON.stringify({index, isStart}))
    },
    addMessage: (message: string) =>{
        const data = localStorage.getItem("copy")
        if(data) {
            const messageList = JSON.parse(data) as string[]
            localStorage.setItem("copy", JSON.stringify([...messageList, message]))
        }else{
            localStorage.setItem("copy", JSON.stringify([message]))
        }
    },
    setObserver: <T>(event: string, callback: (data: T)=>void) =>{
        ipcRenderer.on(event, (event, args)=>{callback(args as T)})
    }
})
