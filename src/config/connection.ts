import { Sequelize } from 'sequelize';

const db = new Sequelize('riba-database', 'root', 'FG$(yAz#Vm@>`Ke,', {
    host: '34.135.241.16',
    dialect: 'mysql',

});


export default db;