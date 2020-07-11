"use strict";
const { commonOptions, commonAssoc } = require("../utils/common");
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    { ...commonOptions }
  );
  Todo.associate = function (models) {
    Todo.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
      ...commonAssoc,
    });
    Todo.hasMany(models.TodoItem, {
      as: "todo_items",
      foreignKey: "todo_id",
      ...commonAssoc,
    });
  };
  return Todo;
};
