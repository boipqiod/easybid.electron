
import AuthService from "../service/AuthService";
import {APIResponse} from "../model/response";
import AuthRouter from "./AuthRouter";
import BidRouter from "./BidRouter";
import DataRouter from "./DadaRouter";

export default class ElectronRouter {
    static init = () => {
        AuthRouter.init()
        BidRouter.init()
        DataRouter.init()
    }
}