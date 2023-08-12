import React from "react";


/**interface****************************/
//상품
export interface BidItem {
    amount: number
    price: number
    name: string
    saleAmount: number
    status: BidStatus
    clients: Client[]
}

//구매자
export interface Client {
    name: string
    amount: number
    note?: string
}

//api 설정
export interface ApiConfig {
    url: string
    method: httpMethod
}

//클라이언트 없이 아이템만
export interface iBidItem {
    amount: number
    price: number
    name: string
}

/**enum****************************/
export enum BidStatus {
    ready,
    sale,
    end
}

export enum httpMethod {
    get = "get",
    post = "post"
}

/**type****************************/
export type setState<T> = React.Dispatch<React.SetStateAction<T>>

export enum Font {

}

export type DisplaySetting = {
    product: DisplaySettingValues
    client: DisplaySettingValues
    backGround?: {
        color: string
    }
}

export type DisplaySettingValues = {
    size: number
    color: string
    font?: Font
}

export enum interfaceType{
    startBid = "startBid",
    endBid = "endBid",
    setItem = "setItem",
    message = "message"
}