import ProductService from "../service/ProductService";
import {ProductItem} from "../utils/tpye";
import UserController from "../common/UserController";
import {FireStoreUtil} from "../utils/FireStoreUtil";

export default class ProductController{
    static shared: ProductController = new ProductController()

    private constructor() {
        this.refreshProductList().then()
    }

    productList: ProductItem[] = []

    private refreshProductList = async () => {
        const userId = UserController.instance.id

        try {
            const data = await FireStoreUtil.instance.getDocData(userId, "_product");
            this.productList = data?.data as ProductItem[]
        } catch (e) {
            console.log(e);
        }
    }

    getProductList = async () => {
        await this.refreshProductList()
        return this.productList
    }

    //상품 데이터 저장 및 수정
    addProductData = async (item: ProductItem) => {
        try {
            this.productList.push(item)
            await ProductService.shared.updateProductData(this.productList)
            return this.productList
        }catch (e){
            console.log(e)
        }
    }

    modifyProductData = async (item: ProductItem) => {
        try {
            this.productList = this.productList.map(product => {
                if(product.id === item.id){
                    return item
                }
                return product
            })
            await ProductService.shared.updateProductData(this.productList)

            return this.productList
        }catch (e){
            console.log(e)
        }
    }

    //데이터 삭제
    deleteProductData = async (id: string) => {
        try {
            this.productList = this.productList.filter(product => product.id !== id)
            await ProductService.shared.updateProductData(this.productList)

            return this.productList
        }catch (e){
            console.log(e)
        }
    }

    saleProduct = async (id: string, amount: number) => {
        try {
            const item = this.productList.find(item => item.id === id)
            if(!item) return false

            item.amount -= amount
            return await this.modifyProductData(item)
        }catch (e){
            console.log(e)
        }
    }
}