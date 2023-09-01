import express, { Request, Response } from 'express';
import path from "path";
import {Server} from "http";

export default class ExpressController {

    private static app: express.Express = express();

    private static server: Server;

    static init = async () => {
        return new Promise<void>(resolve => {
            const port = 3000;

            ExpressController.app.use(express.static(path.join(__dirname, '../dist/views')));

            ExpressController.app.get('*', (req: Request, res: Response) => {
                res.sendFile(path.join(__dirname, '../dist/views/index.html'));
            });

            ExpressController.server = ExpressController.app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}/`);
                resolve()
            });
        })
    }

    static stop = () => {
        ExpressController.server.close()
    }
}