import {ProductItem} from "../utils/tpye";
import {FireStoreUtil} from "../utils/FireStoreUtil";
import UserController from "../common/UserController";

export default class ProductService {
    //싱글턴 인스턴스
    static shared: ProductService = new ProductService();

    private constructor() {}

    private readonly docsName: string = "_product";

    getProductList = async () => {
        const userId = UserController.instance.id

        try {
            const data = await FireStoreUtil.instance.getDocData(userId, this.docsName);
            return data as { [key: string] : ProductItem};
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    //상품 데이터 저장 및 수정
    updateProductData = async (items: ProductItem[]) => {
        const userId = UserController.instance.id

        try {
            await FireStoreUtil.instance.updateFields(userId, this.docsName, {data: items});
        } catch (e) {
            console.log(e);
        }
    }
    //데이터 삭제
    deleteProductData = async (id: string) => {
        const userId = UserController.instance.id

        try {
            await FireStoreUtil.instance.deleteFields(userId, this.docsName, id);
        } catch (e) {
            console.log(e);
        }
    }
}