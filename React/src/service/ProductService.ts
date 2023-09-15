import {API} from "../model/API";
import {ProductItem} from "../utils/tpye";

export default class ProductService{



    static getProductList = async () => {
        return await API.instance.request<ProductItem[]>('/product/getProductList')
    }

    static addProductData = async (item: ProductItem) => {
        return await API.instance.request<ProductItem[]>('/product/addProductData', {item})
    }

    static modifyProductData = async (item: ProductItem) => {
        return await API.instance.request<ProductItem[]>('/product/modifyProductData', {item})
    }

    static deleteProductData = async (id: string) => {
        return await API.instance.request<ProductItem[]>('/product/deleteProductData', {id})
    }

}