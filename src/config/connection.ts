import { DataSource } from 'typeorm';
import { Auth } from '../models/Auth';

import { AInformation } from '../models/A_Information';
import { DInstructor } from '../models/D_Instructor';
import { PInformation } from '../models/P_Information';
import { Recovery } from '../models/Recovery';
import { Role } from '../models/Rol';
import { User } from '../models/User';

//Descomentar este fragmento para local (Desarrollo)

// const db = new DataSource({
//     username: 'root',
//     password: 'FG$(yAz#Vm@>`Ke,',
//     host: '34.135.241.16',
//     database: 'riba-database',
//     type: 'mysql',
//     port: 3306,
//     migrations: [`${__dirname}/migrations/*{.ts,.js}`],
//     migrationsTableName: 'migrations',
//     metadataTableName: 'metadata',
//     entities: [Role, User, Recovery, DInstructor, AInformation,
//         PInformation, Auth],
//     synchronize: false,
//     logging: false,
// })

//Descomentar este fragmento para despliegue (Producción)

const db = new DataSource({
    username: 'root',
    password: 'FG$(yAz#Vm@>`Ke,',
    host: '/cloudsql/riba-plataformaweb-prod:us-central1:riba-database',
    database: 'riba-database',
    type: 'mysql',
    port: 3306,
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
    metadataTableName: 'metadata',
    entities: [Role, User, Recovery, DInstructor, AInformation,
        PInformation, Auth],
    synchronize: false,
    logging: false,
    socketPath: '/cloudsql/riba-plataformaweb-prod:us-central1:riba-database',
})

export default db;