import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import UserCard from "./UserCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTodos from "../hooks/useTodos";
import TodoCard from "./TodoCard";

const Todos = () => {
  const { getTodos, todos, addTodo, deleteTodo, updateTodo } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getTodos();
  }, []);

  const onAdd = useCallback(async () => {
    try {
      await addTodo(newTodo, "");
      setNewTodo("");
    } catch (error) {
      // no-op
    }
  }, [newTodo, addTodo]);

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteTodo(id);
      } catch (error) {
        // no-op
      }
    },
    [deleteTodo]
  );

  const onUpdate = useCallback(
    async (id: number, status: string) => {
      try {
        await updateTodo(id, status);
      } catch (error) {
        // no-op
      }
    },
    [updateTodo]
  );

  const filteredTodos = useMemo(() => {
    if (filter === "Todo") {
      return todos.filter((item) => item.status === "Todo");
    } else if (filter === "Progress") {
      return todos.filter((item) => item.status === "Progress");
    } else if (filter === "Done") {
      return todos.filter((item) => item.status === "Done");
    }
    return todos;
  }, [filter, todos]);

  return (
    <Grid container className="container">
      <Grid item>
        <Grid container className="card" direction="column" rowGap={2}>
          <Grid item>
            <UserCard />
          </Grid>
          <Grid item>
            <Typography variant="h5">Todos</Typography>
          </Grid>
          <Grid item>
            <Grid container columnGap={1} justifyContent="center">
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => setFilter("")}
              >
                <Chip
                  label="All"
                  variant={filter === "" ? "outlined" : "filled"}
                  sx={{
                    color: "#fff",
                    ...(filter === "" && { border: "solid" }),
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => setFilter("Todo")}
              >
                <Chip
                  label="Todo"
                  variant={filter === "Todo" ? "outlined" : "filled"}
                  sx={{
                    color: "#fff",
                    ...(filter === "Todo" && { border: "solid" }),
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => setFilter("Progress")}
              >
                <Chip
                  label="In Progress"
                  variant={filter === "Progress" ? "outlined" : "filled"}
                  sx={{
                    color: "#fff",
                    ...(filter === "Progress" && { border: "solid" }),
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => setFilter("Done")}
              >
                <Chip
                  label="Done"
                  variant={filter === "Done" ? "outlined" : "filled"}
                  sx={{
                    color: "#fff",
                    ...(filter === "Done" && { border: "solid" }),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" columnGap={2}>
              <Grid item bgcolor="#fff" flex={1} borderRadius={1}>
                <TextField
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" disabled={!newTodo} onClick={onAdd}>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container rowGap={1} direction="column">
              {filteredTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={onDelete}
                  onStatusChange={onUpdate}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Todos;
