import {Express} from "express";
import bidRouter from "./router/bid"
import dataRouter from "./router/data"
import authRouter from "./router/auth"
import * as path from "path";

export const setRoutes = (app: Express) =>{
    app.use('/bid', bidRouter)
    app.use('/data', dataRouter)
    app.use('/auth', authRouter)

    //뷰 가져오기
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    });
}