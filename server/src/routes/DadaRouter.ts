import {ipcMain} from "electron";
import BidController from "../controllers/BidController";
import {APIResponse} from "../model/response";
import {BidItem, Client} from "../common/tpye";

export default class DataRouter {
    static init = () => {
        ipcMain.handle('/data/list', async () => {
            const items = BidController.shared.getBidItems();
            return APIResponse.getRes(true, items);
        });

        ipcMain.handle('/data/add', async (event, args) => {
            const data = args as { item: BidItem };
            const items = await BidController.shared.addBidItem(data.item);
            return APIResponse.getRes(true, items);
        });

        ipcMain.handle('/data/remove', async (event, args) => {
            const data = args as { index: number };
            const items = await BidController.shared.removeBidItem(data.index);
            return APIResponse.getRes(true, items);
        });

        ipcMain.handle('/data/modify', async (event, args) => {
            const data = args as { index: number, item: BidItem };
            const items = await BidController.shared.modifyBidItem(data.index, data.item);
            return APIResponse.getRes(true, items);
        });

        ipcMain.handle('/data/addClient', async (event, args) => {
            const data = args as { index: number, client: Client };
            const items = await BidController.shared.addClient(data.index, data.client);
            return APIResponse.getRes(true, items);
        });

    }
}