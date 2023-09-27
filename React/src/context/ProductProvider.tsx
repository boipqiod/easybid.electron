import React, {createContext, PropsWithChildren, useEffect, useState} from "react";
import {interfaceType, ProductItem} from "../utils/tpye";
import ProductService from "../service/ProductService";
import {Loading} from "../components/Loading";
type props = {
    productList: ProductItem[]
    setProductList: (value: ProductItem[]) => void
}

const init: props = {
    productList: [],
    setProductList(_value: ProductItem[]): void {
    }
}

export const ProductContext = createContext<props>(init)

export const ProductProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [productList, setProductList] = useState<ProductItem[]>([])

    const [isLoad, setIsLoad] = useState<boolean>(true)

    //처음 들어오면 데이터 불러오기
    useEffect(() => {
        window.bid.setObserver<ProductItem[]>(interfaceType.setProductList, (data) => {
            setProductList(data)
        })

        ProductService.getProductList().then(res => {
            console.log(res)
            if(res.success && res.data){
                setProductList(res.data)
            }else{
                alert("상품 데이터를 불러오는데 실패하였습니다.")
            }
            setIsLoad(false)
        })
    }, [])

    return (
        <ProductContext.Provider
            value={{
                productList, setProductList
            }}
        >
            {isLoad ? <Loading/> : children}
        </ProductContext.Provider>
    )
}