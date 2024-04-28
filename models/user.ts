import {  DataTypes } from 'sequelize';
import db from '../db/connection';

const users = db.define('user',{
    userName: {
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
})

export default users