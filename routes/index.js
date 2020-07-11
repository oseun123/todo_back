const express = require("express");
const cors = require("cors");
const Route = express.Router();
// controllers
const authController = require("../controllers/authContoller");
const todoController = require("../controllers/todoController");
const todoItemController = require("../controllers/todoItemController");
// middidleware
const { authMiddleware } = require("../middleware/auth");
const { authorizeMiddleware } = require("../middleware/authorize");

//Routes
Route.use(cors());
Route.get("/", (req, res) => res.send({ message: "Welcome to Todo API" }));
// auth routes
Route.post("/api/auth/sign_up", authMiddleware, authController.signUp);
Route.post("/api/auth/sign_in", authController.signIn);
Route.post("/api/auth/forget_password", authController.sendResetLink);
Route.post("/api/auth/reset_password/:token", authController.resetPassword);

// todos routes
Route.post("/api/todos", authorizeMiddleware, todoController.create);
Route.get("/api/todos", authorizeMiddleware, todoController.getAll);
Route.get("/api/todos/:todoId", authorizeMiddleware, todoController.getOne);
Route.put("/api/todos/:todoId", authorizeMiddleware, todoController.update);
Route.delete("/api/todos/:todoId", authorizeMiddleware, todoController.delete);
//  todos items routes
Route.post(
  "/api/:todo_id/todo-items",
  authorizeMiddleware,
  todoItemController.create
);
Route.get(
  "/api/:todo_id/todo-items",
  authorizeMiddleware,
  todoItemController.getAll
);
Route.get(
  "/api/todo-items/:item_id",
  authorizeMiddleware,
  todoItemController.getOne
);
Route.put(
  "/api/todo-items/:item_id",
  authorizeMiddleware,
  todoItemController.update
);
Route.delete(
  "/api/todo-items/:item_id",
  authorizeMiddleware,
  todoItemController.delete
);

module.exports = Route;
