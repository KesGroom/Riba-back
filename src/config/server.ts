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
        this.app.set('trust proxy', true);
        this.app.use(router);
    }

    async dbConnection() {
        try {
            await db.initialize();
            console.log('---- Connect Database ----');

        } catch (error) {
            throw new Error(`Database Error: ${error}`);
        }
    }

    middlewares() {
        const whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200', 'https://riba-plataformaweb-prod.uc.r.appspot.com'];
        const corsOptions = {
            origin: (origin: any, callback: any) => {
                if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true);
                else callback(new Error("Not allowed by CORS"));
            }
        }
        this.app.use(cors(corsOptions));
        //Read body
        this.app.use(express.json());
        //Public folder
        this.app.use(express.static('public'))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`---- API Running in a Port ${this.port}`))
    }
}