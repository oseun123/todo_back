"use strict";
const { commonOptions, commonAssoc } = require("../utils/common");
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define(
    "TodoItem",
    {
      text: DataTypes.TEXT,
      todo_id: DataTypes.INTEGER,
      is_completed: DataTypes.BOOLEAN,
    },
    { ...commonOptions }
  );
  TodoItem.associate = function (models) {
    TodoItem.belongsTo(models.Todo, {
      as: "todo",
      foreignKey: "todo_id",
      ...commonAssoc,
    });
  };
  return TodoItem;
};
