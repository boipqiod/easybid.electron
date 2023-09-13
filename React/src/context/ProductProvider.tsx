import React, {createContext, PropsWithChildren, useEffect, useState} from "react";
import {ProductItem} from "../utils/tpye";

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

    //처음 들어오면 데이터 불러오기
    useEffect(() => {

    }, [])

    return (
        <ProductContext.Provider
            value={{
                productList, setProductList
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}