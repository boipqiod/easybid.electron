import React, {createContext, ReactNode, useEffect, useState} from "react";
import {BidItem, BidStatus, setState} from "../common/tpye";
import API from "../model/API";
import Storage from "../Utils/Storage";
import {Auth} from "../views/auth/Auth";
import {Loading} from "../views/common/Loading";

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
}

const init: props = {
    addClientIndex: 0, setAddClientIndex(value: ((prevState: number) => number) | number): void {
    },
    auth: false, setAuth(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    init: false, setInit(value: ((prevState: boolean) => boolean) | boolean): void {
    },
    bidItems: [],
    ebId: "",
    modifyIndex: 0,
    onSaleIndex: 0,
    setBidItems(value: ((prevState: BidItem[]) => BidItem[]) | BidItem[]): void {
    },
    setEbId(value: ((prevState: string) => string) | string): void {
    },
    setModifyIndex(value: ((prevState: number) => number) | number): void {
    },
    setOnSaleIndex(value: ((prevState: number) => number) | number): void {
    }

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

    //아이디
    const [ebId, setEbId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [init, setInit] = useState<boolean>(false)
    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        const ebId = Storage.getEbId()
        const fileName = Storage.getFileName()
        const youtubeUrl = Storage.getYoutubeUrl()

        //아이디가 저장되어있지 않는 경우
        //아이디 저장으로 이동
        if(!ebId || ebId === ""){
            setLoading(true)
            return
        }else{
            setEbId(ebId)
            setAuth(true)
        }

        //파일 이름이나 유튜브 url 이 없는 경우
        //이닛을 확인할 필요 없음
        if(!fileName || fileName === "" ||
            !youtubeUrl || youtubeUrl === ""){
            setLoading(true)
            return
        }

        //이닛이 되어있는지 확인
        API.shared
        .isInit()
        .then(res =>{
            //이미 이닛이 되어있는 경우
            if(res.success && res.data){
                setBidItems(res.data)
                const index = res.data.findIndex(v=>v.status === BidStatus.sale)
                setOnSaleIndex(index)
                setLoading(true)
            }else{
                //아니면 초기화
                API.shared
                .init(ebId, fileName, youtubeUrl)
                .then(res =>{
                    if(res.success && res.data){
                        setBidItems(res.data)
                        const index = res.data.findIndex(v=>v.status === BidStatus.sale)
                        setOnSaleIndex(index)
                        setLoading(true)
                    }
                })
            }
        })
    }, []);

    //로딩 중
    if (!loading) {
        return <Loading />
    }

    return (
        <BidContext.Provider value={{
            bidItems, setBidItems,
            onSaleIndex, setOnSaleIndex,
            modifyIndex, setModifyIndex,
            addClientIndex, setAddClientIndex,

            auth, setAuth,
            init, setInit,
            ebId, setEbId
        }}>
            {
                auth ? children : <Auth />
            }

        </BidContext.Provider>
    )
}