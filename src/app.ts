import "dotenv/config";
import "reflect-metadata";
import { Server } from "./config/server"

const server = new Server;
server.listen(); 