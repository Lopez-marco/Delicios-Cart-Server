const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('shoppingList', {
        item_name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        category:
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bought: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
}
