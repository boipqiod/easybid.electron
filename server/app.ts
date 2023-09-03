import {app} from "electron"
import AppController from "./src/controllers/AppController";


import { autoUpdater } from 'electron-updater';


app.on('ready', async () => {
    await AppController.init()

})