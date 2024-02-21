// models/roomUsageModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Client = require('./clientModel');
const Room = require('./roomModel');

const RoomUsage = sequelize.define('RoomUsage', {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  quotaUsed: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'roomusage',
  updatedAt: false
});
// Menetapkan asosiasi antara RoomUsage dan Client
RoomUsage.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
RoomUsage.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
module.exports = RoomUsage;