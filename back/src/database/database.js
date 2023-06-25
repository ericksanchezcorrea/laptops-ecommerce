import Sequelize from 'sequelize'
import pg from 'pg'
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from '../config.js'

// export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'postgres' 
// });

export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}`, {
    dialectModule: pg
  })