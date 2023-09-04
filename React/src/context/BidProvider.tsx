import React, {createContext, ReactNode, useEffect, useState} from "react";
import {BidItem, BidStatus, setState} from "../common/tpye";
import Storage from "../Utils/Storage";
import {Auth} from "../views/auth/Auth";
import {Loading} from "../views/common/Loading";
import {ElectronAPI} from "../model/ElectronAPI";

interface props {
    bidItems: BidItem[],
    setBidItems: setState<BidItem[]>
    onSaleIndex: number
    setOnSaleIndex: setState<number>
    modifyIndex: number
    setModifyIndex: setState<number>
    addClientIndex: number
    setAddClientIndex: setState<number>
    ebId: string
    setEbId: setState<string>
    auth: boolean,
    setAuth: setState<boolean>
    init: boolean,
    setInit: setState<boolean>
    setting: boolean,
    setSetting: setState<boolean>
}

const init: props = {
    addClientIndex: 0, setAddClientIndex(_value: ((prevState: number) => number) | number): void {
    },
    auth: false, setAuth(_value: ((prevState: boolean) => boolean) | boolean): void {
    },
    init: false, setInit(_value: ((prevState: boolean) => boolean) | boolean): void {
    },
    bidItems: [],
    ebId: "",
    modifyIndex: 0,
    onSaleIndex: 0,
    setBidItems(_value: ((prevState: BidItem[]) => BidItem[]) | BidItem[]): void {
    },
    setEbId(_value: ((prevState: string) => string) | string): void {
    },
    setModifyIndex(_value: ((prevState: number) => number) | number): void {
    },
    setOnSaleIndex(_value: ((prevState: number) => number) | number): void {
    }
    , setting: false, setSetting(_value: ((prevState: boolean) => boolean) | boolean): void {}
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

    //아이디
    const [ebId, setEbId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [init, setInit] = useState<boolean>(false)
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        initAuth().then()
    }, []);

    //로딩 중

    const initAuth = async () => {
        const fileName = Storage.getFileName()
        const youtubeUrl = Storage.getYoutubeUrl()

        console.log(fileName, youtubeUrl)

        //이닛을 확인할 필요 없음
        if(!fileName || fileName === "" ||
            !youtubeUrl || youtubeUrl === ""){
            setLoading(true)
            return
        }

        const isInitRes = await ElectronAPI.instance.isInit()
        if(isInitRes.success && isInitRes.data) {
            setBidItems(isInitRes.data)
            const index = isInitRes.data.findIndex(v => v.status === BidStatus.sale)
            setOnSaleIndex(index)
            setAuth(true)
            setLoading(true)
            return
        }else{
            setLoading(true)
            return
        }

        // const initRes = await ElectronAPI.instance.init(fileName, youtubeUrl)
        // if(initRes.success && initRes.data){
        //     setBidItems(initRes.data)
        //     const index = initRes.data.findIndex(v=>v.status === BidStatus.sale)
        //     setOnSaleIndex(index)
        //     setLoading(true)
        // }
    }


    if (!loading) {
        return <Loading />
    }

    return (
        <BidContext.Provider value={{
            bidItems, setBidItems,
            onSaleIndex, setOnSaleIndex,
            modifyIndex, setModifyIndex,
            addClientIndex, setAddClientIndex,

            setting, setSetting,

            auth, setAuth,
            init, setInit,
            ebId, setEbId,


        }}>
            {
                auth ? children : <Auth />
            }

        </BidContext.Provider>
    )
}
