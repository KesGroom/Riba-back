import { DataTypes } from 'sequelize';
import db from '../config/connection';

const User = db.define('users', {
    dni: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default User;