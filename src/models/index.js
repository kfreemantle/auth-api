'use strict';

const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL);

const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');


module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
}