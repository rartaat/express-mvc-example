'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clocks', [
      {
        manufacturer: 'Casio',
        model: 'erintos',
        type: 'waterproof',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Fossil',
        model: 'pilota',
        type: 'retro style',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        manufacturer: 'Rolex',
        model: 'eleganta 12',
        type: 'sports',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Doxa',
        model: 'Nabu-kodonozor',
        type: 'casual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
