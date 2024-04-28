import {  DataTypes } from 'sequelize';
import db from '../db/connection';

const schools = db.define('school',{
    name: {
        type: DataTypes.STRING
    }
})

export default schools