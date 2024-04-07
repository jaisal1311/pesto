import { useState } from "react";
import server from "../service";
import { Todo } from "../models/todo";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      const data = await server.get("/todos");
      setTodos(data.data.todos);
      return { todos };
    } catch (error) {
      console.log({ error });
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const data = await server.post(
        "/todos",
        JSON.stringify({
          title: title,
          description: description,
        })
      );
      if (data) {
        console.log({ data });
        // Handle successful response
        setTodos((prev) => [...prev, data.data.data.todo]);
        console.log({ data });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const data = await server.delete(`/todos/${id}`);
      if (data) {
        setTodos((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const updateTodo = async (id: number, status: string) => {
    try {
      const data = await server.patch(
        `/todos`,
        JSON.stringify({
          id,
          status,
        })
      );
      if (data) {
        setTodos((prev) => {
          const newTodos = [...prev];
          const index = newTodos.findIndex((item) => item.id === id);
          newTodos[index] = data.data.todo;
          return newTodos;
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return { getTodos, todos, addTodo, deleteTodo, updateTodo };
};

export default useTodos;
