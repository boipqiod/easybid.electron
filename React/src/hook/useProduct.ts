import {ProductContext} from "../context/ProductProvider";
import {useContext} from "react";
import {ProductItem} from "../utils/tpye";
import ProductService from "../service/ProductService";
import {useAlert} from "./utils/useAlert";

export const useProduct = () => {
    const context = useContext(ProductContext)!
    const {productList, setProductList} = context
    const {showAlert, showConfirm} = useAlert()

    const addProductData = async (name: string, amount: number) => {

        const item :ProductItem = {
            id: `(${name})${Date.now().toString()}`,
            name,
            amount,
        }

        const res = await ProductService.addProductData(item)

        if(!res.success || !res.data){
            await showAlert("상품 추가 실패")
        }else{
            setProductList(res.data)
        }

        return {
            success: res.success,
            item: item
        }
    }

    const modifyProductData = async (item: ProductItem) => {
        const res = await ProductService.modifyProductData(item)
        if(res.success && res.data){
            await showAlert("상품이 수정되었습니다.")
            setProductList(res.data)
        }else{
            await showAlert("상품 수정 실패")
        }

        return res.success
    }

    const modifyProductAmount = async (id: string, amount: number) => {
        const item = productList.find(item => item.id === id)
        if(!item) return false

        item.amount = amount
        return await modifyProductData(item)
    }

    const deleteProductData = async (id: string) => {
        const confirm = await showConfirm("정말로 삭제하시겠습니까?")
        if(!confirm) return false

        const res = await ProductService.deleteProductData(id)
        if(res.success && res.data){
            await showAlert("상품이 삭제되었습니다.")
            setProductList(res.data)
        }else{
            await showAlert("상품 삭제 실패")
        }

        return res.success
    }

    return {
        productList,
        addProductData,
        modifyProductData,
        modifyProductAmount,
        deleteProductData,

    }
}