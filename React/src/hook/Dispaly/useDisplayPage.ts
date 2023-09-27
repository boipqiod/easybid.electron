import {useBid} from "../common/useBid";
import {useEffect, useState} from "react";
import {BidItem, DisplaySetting, interfaceType} from "../../utils/tpye";
import StorageUtil from "../../utils/StorageUtil";

export const useDisplayPage = () => {

    const {bidItems, setBidItems, onSaleIndex, setOnSaleIndex} = useBid()
    const [setting, setSetting] = useState<DisplaySetting>()

    useEffect(() => {
        initDisplaySetting()

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [])

    useEffect(() => {
        window.bid.setObserver<BidItem[]>(interfaceType.setItem, (data) => {
            setBidItems(data)
        })

        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.startBid, (data) => {
            setOnSaleIndex(data.index)
            setBidItems(data.items)
        })
        window.bid.setObserver<{ items: BidItem[], index: number }>(interfaceType.endBid, (data) => {
            setOnSaleIndex(-1)
            setBidItems(data.items)
        })

    }, [bidItems, setBidItems, setOnSaleIndex])

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
                    color: "#000000",
                    weight: 700
                },
                client: {
                    size: 20,
                    color: "#000000",
                    weight: 700
                },
            }
            setSetting(settingInit)
        }
    }

    return {
        bidItems, onSaleIndex, setting
    }

}