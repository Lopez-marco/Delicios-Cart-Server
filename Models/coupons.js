const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('coupons', {
        coupon:
        {
            type: DataTypes.JSON,
            allowNull: false,
        },
    });
} 