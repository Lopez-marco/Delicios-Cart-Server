const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('shoppingList', {
        item_name:
        {
            type: DataTypes.STRING,
        },
        quantity:
        {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        bought: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}
