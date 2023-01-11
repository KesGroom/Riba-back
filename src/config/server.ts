import cors from "cors";
import express, { Application } from "express";
import { router } from "../routes";
import db from "./connection";

export class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';
        this.dbConnection();
        this.middlewares();
        this.app.use(router);
    }

    async dbConnection() {
        try {
            await db.authenticate({});
            console.log('---- Connect Database ----');
            
        } catch (error) {
            throw new Error(`Database Error: ${error}`);
        }
    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //Read body
        this.app.use(express.json());
        //Public folder
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`---- API Running in a Port ${this.port}`))
    }
}