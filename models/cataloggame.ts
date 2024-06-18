import {  DataTypes } from 'sequelize';
import db from '../db/connection';

const catGames = db.define('cataloggame',{
    name: {
        type: DataTypes.STRING
    }
})

export default catGames