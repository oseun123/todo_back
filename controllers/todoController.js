const models = require("../models");
const { Todo, TodoItem } = models;

exports.create = async ({ body, decoded }, res, next) => {
  try {
    const { title } = body;
    const { id } = decoded;

    const todo = await Todo.create({ title, user_id: id });

    // modified to make data is consistent
    const todo1 = await Todo.findOne({
      where: { user_id: todo.user_id, id: todo.id },
      include: [
        {
          model: TodoItem,
          as: "todo_items",
        },
      ],
    });
    return res.status(201).send({
      status: "success",
      message: "Created successfully",
      payload: { todo: todo1 },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.getAll = async ({ decoded }, res, next) => {
  // console.log("here");
  try {
    const { id } = decoded;
    const todos = await Todo.findAll({
      where: { user_id: id },
      order: [
        ["id", "DESC"],
        ["todo_items", "id", "DESC"],
      ],
      include: [
        {
          model: TodoItem,
          as: "todo_items",
        },
      ],
    });
    return res.status(201).send({
      status: "success",
      message: " successfully",
      payload: { todos },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.getOne = async ({ params, decoded }, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { user_id: decoded.id, id: params.todoId },
      include: [
        {
          model: TodoItem,
          as: "todo_items",
        },
      ],
    });
    if (!todo) {
      return res.status(404).send({
        status: "error",
        message: "Todo not found",
        payload: {},
      });
    }
    return res.status(201).send({
      status: "success",
      message: " successfully",
      payload: { todo },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.update = async ({ body, decoded, params }, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { user_id: decoded.id, id: params.todoId },
      include: [
        {
          model: TodoItem,
          as: "todo_items",
        },
      ],
    });
    if (!todo) {
      return res.status(404).send({
        status: "error",
        message: "Wrong Todo id ",
        payload: {},
      });
    }
    const updatedTodo = await todo.update({
      title: body.title || todo.title,
    });

    return res.status(201).send({
      status: "success",
      message: " successfully updated",
      payload: { todo: updatedTodo },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.delete = async ({ params, decoded }, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { user_id: decoded.id, id: params.todoId },
    });
    if (!todo) {
      return res.status(404).send({
        status: "error",
        message: "Wrong Todo id ",
        payload: {},
      });
    }
    const deletedTodo = await todo.destroy();
    return res.status(201).send({
      status: "success",
      message: " successfully deleted",
      payload: { todo: deletedTodo },
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
