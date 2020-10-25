const { DataTypes } = require('sequelize');
const { models } = require('../db');

module.exports = (sequelize) => {
    sequelize.define('categories', {
        category:
        {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        default:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
    });
}

