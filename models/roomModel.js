// models/roomModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costPerHour: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Room;
