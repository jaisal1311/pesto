import { createTodo, deleteTodo, getTodos, updateTodo } from "@controllers/todo";
import express from "express";

const user = express.Router();

user.get("/todos", getTodos);
user.post("/todos", createTodo);
user.delete("/todos/:id", deleteTodo);
user.patch("/todos", updateTodo);

export default user;
