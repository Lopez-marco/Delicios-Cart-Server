const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('list', {
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}
