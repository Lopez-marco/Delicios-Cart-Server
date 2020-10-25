'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      { category: 'Dairy', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Produce', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Meats/Fish', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Bread/Bakery', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Frozen Foods', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Personal Care', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Cleaners/Paper Goods', default: true, createdAt: new Date(),
      updatedAt: new Date() },
      { category: 'Other', default: true, createdAt: new Date(),
      updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};