import React, {useEffect, useState} from "react";
import {useBid} from "../../../hook/useBid";
import Utils from "../../../utils/Utils";
import StorageUtil from "../../../utils/StorageUtil";
import {BidItem, DisplaySetting, interfaceType} from "../../../utils/tpye";
import { Helmet } from 'react-helmet';

export const Display = () => {

    const {bidItems, setBidItems, onSaleIndex, setOnSaleIndex} = useBid()

    const [setting, setSetting] = useState<DisplaySetting>()

    useEffect(() => {
        initDisplaySetting()

        window.addEventListener('storage', handleStorageChange);

        // Clean up
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data) => {
            console.log("setItem", data)
            setBidItems(data)
        })

        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.startBid, (data) => {
            console.log("startBid", data)

            setOnSaleIndex(data.index)
            setBidItems(data.items)
        })
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data) => {
            console.log("endBid", data)

            setOnSaleIndex(-1)
            setBidItems(data.items)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bidItems])

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'setting' && e.newValue) {
            const _setting = JSON.parse(e.newValue) as DisplaySetting
            setSetting(_setting)
        }
    }

    const initDisplaySetting = () => {
        const _setting = StorageUtil.getSetting()
        if (_setting) {
            setSetting(_setting)
        } else {
            const settingInit: DisplaySetting = {
                product: {
                    size: 30,
                    color: "#000000"
                },
                client: {
                    size: 20,
                    color: "#000000"
                },
            }
            setSetting(settingInit)
        }
    }

    const item = (index: number) => {
        return (
            <h1 style={{fontSize: setting?.client.size, color: setting?.client.color, fontWeight: "bold"}}
                className="col-3" key={index}>
                {`${bidItems[onSaleIndex].clients[index].name}님 ${bidItems[onSaleIndex].clients[index].amount}개`}
            </h1>
        )
    }

    return (
        <>
            <Helmet>
                <title>EasyBid: 판매자 정보</title>
            </Helmet>
            <div style={{backgroundColor: "green"}} className="vw-100 vh-100 d-flex align-items-center flex-column">
                {
                    onSaleIndex !== -1 &&
                    <>
                        <div className="justify-content-center align-items-center flex-column my-5">
                            <h1 style={{
                                fontSize: setting?.product.size,
                                color: setting?.product.color,
                                fontWeight: "bold"
                            }}>{bidItems[onSaleIndex].name}</h1>
                            <h1 style={{
                                fontSize: setting?.product.size,
                                color: setting?.product.color,
                                fontWeight: "bold"
                            }}>{bidItems[onSaleIndex].price !== 0 && Utils.formatCurrency(bidItems[onSaleIndex].price)}</h1>
                        </div>
                        <div className="row w-100 text-center">
                            {
                                bidItems[onSaleIndex].clients.map((client, index) => {
                                    return item(index)
                                })
                            }
                        </div>

                    </>
                }
            </div>
        </>
    )
}
