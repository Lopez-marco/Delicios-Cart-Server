const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    sequelize.define('shoppingList', {
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false,

        },
        quantity:
        {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        category:
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bought: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        order:
        {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
}
