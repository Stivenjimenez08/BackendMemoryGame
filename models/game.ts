import {  DataTypes } from 'sequelize';
import db from '../db/connection';
import schools from './school'
import cataloggames from './cataloggame'

const games = db.define('game',{
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.BIGINT
    }, 
    grade: {
        type: DataTypes.BIGINT
    }, 
    hit: {
        type: DataTypes.BIGINT
    },
    failure: {
        type: DataTypes.BIGINT
    },
    note: {
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.BIGINT
    },
    playingTime:{
        type: DataTypes.STRING
    },
    idSchool:{
        type: DataTypes.BIGINT
    },
    idGame:{
        type: DataTypes.BIGINT
    }
})

games.belongsTo( schools, {
    foreignKey: 'idSchool'
})
games.belongsTo( cataloggames, {
    foreignKey: 'idGame'
})

export default games