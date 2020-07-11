"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("TodoItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      todo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Todos",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TodoItems");
  },
};
