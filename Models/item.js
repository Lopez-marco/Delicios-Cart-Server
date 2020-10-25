const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('item', {
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
        }, 
        order:
        {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
}
