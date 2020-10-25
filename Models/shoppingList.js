const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('shoppingList', {
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}
