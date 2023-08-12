import express, {Express} from "express";
import path from "path";
import {setRoutes} from "./src/routes";
import cors from "cors";
import {Server} from "http";

export class ExpressServer {
    app: Express = express()
    port = 3000;

    static shared = new ExpressServer()

    private server:  Server | undefined

    constructor() {
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname)));
        this.app.use(express.static(path.join(__dirname, 'src', 'views')));
        this.app.use(express.static(path.join(__dirname, 'build/views')));
        setRoutes(this.app)
    }

    start = async ()=>{
        this.server = this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }

    end = async ()=>{
        this.server?.close(()=>{
        })
    }
}