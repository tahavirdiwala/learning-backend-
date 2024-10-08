"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "perfume",
        image: "perfume.jpg",
      },
      {
        name: "furniture",
        image: "furniture.jpg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
