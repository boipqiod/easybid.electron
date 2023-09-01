import React, {useEffect, useState} from "react";
import {useBid} from "../../hook/useBid";
import Utils from "../../Utils/Utils";
import {BidItem, DisplaySetting, interfaceType} from "../../common/tpye";
import Storage from "../../Utils/Storage";

export const Display:React.FC = () =>{

    const {bidItems, setBidItems, onSaleIndex, setOnSaleIndex} = useBid()

    const [setting, setSetting] = useState<DisplaySetting>()

    useEffect(()=>{
        initObserver()
        initDisplaySetting()

        window.addEventListener('storage', handleStorageChange);

        // Clean up
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    },[])

    const initObserver = () =>{
        // @ts-ignore
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data)=>{
            console.log("setItem", data)
            setBidItems(data)
        })

        // @ts-ignore
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.startBid, (data)=>{
            console.log("startBid", data)

            setOnSaleIndex(data.index)
            setBidItems(data.items)
        })
        // @ts-ignore
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data)=>{
            console.log("endBid", data)

            setOnSaleIndex(-1)
            setBidItems(data.items)
        })

    }

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'setting' && e.newValue) {
            const _setting = JSON.parse(e.newValue) as DisplaySetting
            setSetting(_setting)
        }
    }

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

    const item = (index: number) =>{
        return (
            <h1 style={{fontSize: setting?.client.size, color: setting?.client.color, fontWeight: "bold"}} className="col-3" key={index}>
                {`${bidItems[onSaleIndex].clients[index].name}님 ${bidItems[onSaleIndex].clients[index].amount}개`}
            </h1>
        )
    }

    return(
        <div style={{backgroundColor: "green"}} className="vw-100 vh-100 d-flex align-items-center flex-column">
            {
                onSaleIndex !== -1 &&
                <>
                    <div className="justify-content-center align-items-center flex-column my-5">
                        <h1 style={{fontSize: setting?.product.size, color: setting?.product.color, fontWeight: "bold"}}>{bidItems[onSaleIndex].name}</h1>
                        <h1 style={{fontSize: setting?.product.size, color: setting?.product.color, fontWeight: "bold"}}>{Utils.formatCurrency(bidItems[onSaleIndex].price)}</h1>
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
