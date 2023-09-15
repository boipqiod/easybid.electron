
/**interface****************************/
//상품
export interface BidItem {
    //남은 수량
    amount: number
    //상품 가격
    price: number
    //상품 이름
    name: string
    //판매된 수량
    saleAmount: number
    //상태
    status: BidStatus
    //구매자 리스트
    clients: Client[]
    //product id
    productId: string
}
//구매자
export interface Client {
    //구매자 이름
    name: string
    //구매 수량
    amount: number
    //비고
    note: string
}
//api 설정
export interface ApiConfig{
    url: string
    method: httpMethod
}

//클라이언트 없이 아이템만
export interface iBidItem{
    amount: number
    maxAmount: number
    price: number
    name: string
}

/**enum****************************/
export enum BidStatus{
    ready,
    sale,
    end
}

export enum httpMethod{
    get = "get",
    post = "post"
}


export enum interfaceType{
    startBid = "startBid",
    endBid = "endBid",
    setItem = "setItem",
    message = "message",
    setProductList = "setProductList"
}

/**** 상품 관련 ****/

export type ProductItem = {
    id: string
    name: string
    amount: number
}