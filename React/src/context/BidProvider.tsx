import React, {createContext, ReactNode, useEffect, useState} from "react";
import StorageUtil from "../utils/StorageUtil";
import {Loading} from "../pages/common/Loading";
import {BidItem, BidStatus, setState} from "../utils/tpye";
import BidService from "../service/BidService";

interface props {
    bidItems: BidItem[],
    setBidItems: setState<BidItem[]>
    onSaleIndex: number
    setOnSaleIndex: setState<number>
    modifyIndex: number
    setModifyIndex: setState<number>
    addClientIndex: number
    setAddClientIndex: setState<number>
    init: boolean,
    setInit: setState<boolean>
    setting: boolean,
    setSetting: setState<boolean>
    isAddProduct: boolean,
    setIsAddProduct: setState<boolean>
}

const init: props = {
    addClientIndex: 0,
    bidItems: [],
    init: false,
    isAddProduct: false,
    modifyIndex: 0,
    onSaleIndex: 0,
    setAddClientIndex(value: ((prevState: number) => number) | number): void {
    },
    setBidItems(value: ((prevState: BidItem[]) => BidItem[]) | BidItem[]): void {
    },
    setInit(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setIsAddProduct(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setModifyIndex(value: ((prevState: number) => number) | number): void {
    },
    setOnSaleIndex(value: ((prevState: number) => number) | number): void {
    },
    setSetting(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    setting: false
}

export const BidContext = createContext<props>(init)

export const BidProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    //전역관리 상품
    const [bidItems, setBidItems] = useState<BidItem[]>([])
    //현재 판매 중인 상품 인덱스
    const [onSaleIndex, setOnSaleIndex] = useState<number>(-1)
    //현재 수정 중인 상품 인덱스
    const [modifyIndex, setModifyIndex] = useState<number>(-1)
    //현재 구매자를 추가하려는 상품의 인덱스
    const [addClientIndex, setAddClientIndex] = useState<number>(-1)
    //세팅 모달
    const [setting, setSetting] = useState<boolean>(false)
    //상품 추가 모달
    const [isAddProduct, setIsAddProduct] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [init, setInit] = useState<boolean>(false)

    useEffect(() => {
        initAuth().then()
    }, []);

    //로딩 중

    const initAuth = async () => {
        const fileName = StorageUtil.getFileName()
        const youtubeUrl = StorageUtil.getYoutubeUrl()

        console.log(fileName, youtubeUrl)

        //이닛을 확인할 필요 없음
        if (!fileName || fileName === "" ||
            !youtubeUrl || youtubeUrl === "") {

            console.log("initAuth", "no init")
            setLoading(true)
            return
        }

        const isInitRes = await BidService.isInit()
        if (isInitRes.success && isInitRes.data) {
            setBidItems(isInitRes.data)
            const index = isInitRes.data.findIndex(v => v.status === BidStatus.sale)
            setOnSaleIndex(index)
            setLoading(true)
            return
        } else {
            setLoading(true)
            return
        }
    }

    return (
        <BidContext.Provider value={{
            bidItems, setBidItems,
            onSaleIndex, setOnSaleIndex,
            modifyIndex, setModifyIndex,
            addClientIndex, setAddClientIndex,

            setting, setSetting,
            isAddProduct, setIsAddProduct,

            init, setInit,
        }}>
            {loading ? children : <Loading/>}
        </BidContext.Provider>
    )
}
