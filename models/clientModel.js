// models/clientModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Client = sequelize.define('Client', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
module.exports = Client;
