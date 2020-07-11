const models = require("../models");
const { Todo, TodoItem } = models;

exports.create = async ({ body: { text }, params: { todo_id } }, res, next) => {
  try {
    const item = await TodoItem.create({ text, todo_id });
    return res.status(201).send({
      status: "success",
      message: " successfully todo item created",
      payload: { item },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.getAll = async ({ params: { todo_id } }, res, next) => {
  try {
    const items = await TodoItem.findAll({
      where: { todo_id: todo_id },
      include: [
        {
          model: Todo,
          as: "todo",
        },
      ],
    });
    if (items.length) {
      return res.status(201).send({
        status: "success",
        message: "",
        payload: { items },
      });
    }
    return res.status(400).send({
      status: "error",
      message: "No todo items found",
      payload: {},
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
exports.getOne = async ({ params: { item_id } }, res, next) => {
  try {
    const item = await TodoItem.findOne({
      where: { id: item_id },
      include: [
        {
          model: Todo,
          as: "todo",
        },
      ],
    });
    if (item) {
      return res.status(201).send({
        status: "success",
        message: "",
        payload: { item },
      });
    }
    return res.status(400).send({
      status: "error",
      message: "No todo items found",
      payload: {},
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
exports.update = async (
  { params: { item_id }, body: { text, is_completed } },
  res,
  next
) => {
  try {
    const item = await TodoItem.findOne({
      where: { id: item_id },
      include: [
        {
          model: Todo,
          as: "todo",
        },
      ],
    });
    if (item) {
      const updatedItem = await item.update({
        text: text || item.text,
        is_completed: is_completed || item.is_completed,
      });
      return res.status(201).send({
        status: "success",
        message: "Todo item updated successfully",
        payload: { item: updatedItem },
      });
    }
    return res.status(400).send({
      status: "error",
      message: "No todo items found",
      payload: {},
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
exports.delete = async ({ params: { item_id } }, res, next) => {
  try {
    const item = await TodoItem.findOne({
      where: { id: item_id },
      include: [
        {
          model: Todo,
          as: "todo",
        },
      ],
    });
    if (item) {
      const deletedItem = await item.destroy();
      return res.status(201).send({
        status: "success",
        message: "Todo item deleted successfully",
        payload: { item: deletedItem },
      });
    }
    return res.status(400).send({
      status: "error",
      message: "No todo items found",
      payload: {},
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
