import {ipcMain} from "electron";
import ProductController from "../controllers/ProductController";
import {ProductItem} from "../utils/tpye";
import {APIResponse} from "../model/response";

export default class ProductRouter {
    static init = () =>{
        ipcMain.handle('/product/getProductList', async ()=>{
            const res = await ProductController.shared.getProductList()
            return APIResponse.getRes<ProductItem[]>(true, res);
        })

        ipcMain.handle('/product/addProductData', async (event, args)=>{
            const data = args as { item: ProductItem };
            const res =  await ProductController.shared.addProductData(data.item);
            return APIResponse.getRes<ProductItem[]>(true, res);
        })

        ipcMain.handle('/product/modifyProductData', async (event, args)=>{
            const data = args as { item: ProductItem };
            const res =  await ProductController.shared.modifyProductData(data.item);
            return APIResponse.getRes<ProductItem[]>(true, res);
        })

        ipcMain.handle('/product/deleteProductData', async (event, args)=>{
            const data = args as { id: string }
            const res =  await ProductController.shared.deleteProductData(data.id);
            return APIResponse.getRes<ProductItem[]>(true, res);
        })
    }
}