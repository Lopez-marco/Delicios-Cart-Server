const { Sequelize } = require('sequelize');
const User = require('./Models/user');
const Item = require('./Models/item');
const ShoppingList = require('./Models/shoppingList');
const Categories = require('./Models/categories');
const Coupons = require('./Models/coupons');

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres'
});

User(sequelize);
Item(sequelize);
ShoppingList(sequelize);
Categories(sequelize);
Coupons(sequelize);

const { user, shoppingList, coupons, item, categories } = sequelize.models;

user.hasMany(shoppingList);
shoppingList.belongsTo(user);
shoppingList.hasMany(item);
item.belongsTo(shoppingList);
categories.hasOne(item);
user.hasMany(categories);
item.belongsTo(categories);
categories.belongsTo(user);
user.hasMany(coupons);
coupons.belongsTo(user);

sequelize.authenticate()
    .then(() => console.log('******* DB INITIALIZED *******'));

module.exports = sequelize;