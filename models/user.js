"use strict";
const { commonOptions, commonAssoc } = require("../utils/common");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { ...commonOptions }
  );
  User.associate = function (models) {
    User.hasMany(models.Todo, {
      as: "todos",
      foreignKey: "user_id",
      ...commonAssoc,
    });
  };
  return User;
};
