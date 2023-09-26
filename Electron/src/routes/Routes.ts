
import AuthService from "../service/AuthService";
import {APIResponse} from "../model/response";
import AuthRouter from "./AuthRouter";
import BidRouter from "./BidRouter";
import DataRouter from "./DadaRouter";
import ProductRouter from "./ProductRouter";

export default class Routes {
    static init = () => {
        AuthRouter.init()
        BidRouter.init()
        DataRouter.init()
        ProductRouter.init()
    }
}