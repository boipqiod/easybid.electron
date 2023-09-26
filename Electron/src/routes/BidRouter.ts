import {ipcMain} from "electron";
import BidController from "../controllers/BidController";
import {APIResponse} from "../model/response";
import {ChatController} from "../common/ChatController";
import EncryptUtil from "../utils/EncryptUtil";

export default class BidRouter{
    static init = () => {
        ipcMain.handle('/bid/init', async (event, args) => {
            const data = args as { id: string, fileName: string, youtubeUrl: string };
            const isInit = await BidController.init(data.id, data.fileName, data.youtubeUrl);

            return isInit.success ?
                APIResponse.getRes(true, BidController.shared.getBidItems()) :
                APIResponse.getRes(false, isInit.error);
        });

        ipcMain.handle('/bid/start', async (event, args) => {
            const data = args as { index: number };
            const item = await BidController.shared.startBid(data.index);
            return APIResponse.getRes(true, item);
        });

        ipcMain.handle('/bid/end', async (event, args) => {
            const data = args as { index: number };
            const item = await BidController.shared.endBid(data.index);
            return APIResponse.getRes(true, item);
        });

        ipcMain.handle('/bid/isInit', async (event, args) => {
            const isInit = BidController.shared.isInit;
            const items = BidController.shared.bidItems;
            return APIResponse.getRes(isInit, isInit ? items : []);
        });

        ipcMain.handle('/bid/message', async (event, args) => {
            const data = args as { message: string }
            console.log('message', data)
            ChatController.shared.sendChat(data.message);
            return APIResponse.getRes(true, null);
        })

    }
}