import {app, session} from "electron"
import AppController from "./src/controllers/AppController";

app.on('ready', async () => {
    await AppController.init()
})