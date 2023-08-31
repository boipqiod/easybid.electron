import {app} from "electron"
import ElectronRouter from "./src/controllers/AppController";

app.on('ready', async () => {
    await ElectronRouter.init()
})