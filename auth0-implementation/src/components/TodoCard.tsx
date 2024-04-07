import { Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { Todo } from "../models/todo";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onDelete,
  onStatusChange,
}) => {
  return (
    <Grid
      container
      key={todo.id}
      sx={{
        justifyContent: "space-between",
        padding: "16px",
        background: "white",
        borderRadius: "10px",
        boxShadow:
          "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(190, 190, 190), 0.3em 0.3em 1em rgba(0,0,0,0.3)",
      }}
    >
      <Grid item>
        <Grid container direction="column" rowGap={1} alignItems="flex-start">
          <Grid item>
            <Typography>{todo.title}</Typography>
          </Grid>
          <Grid item>
            <Grid container columnGap={1}>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => onStatusChange(todo.id, "Todo")}
              >
                <Chip
                  label="Todo"
                  variant={todo.status === "Todo" ? "outlined" : "filled"}
                />
              </Grid>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => onStatusChange(todo.id, "Progress")}
              >
                <Chip
                  label="In Progress"
                  variant={todo.status === "Progress" ? "outlined" : "filled"}
                />
              </Grid>
              <Grid
                item
                sx={{ cursor: "pointer" }}
                onClick={() => onStatusChange(todo.id, "Done")}
              >
                <Chip
                  label="Done"
                  variant={todo.status === "Done" ? "outlined" : "filled"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item onClick={() => onDelete(todo.id)}>
        <RemoveCircleOutlineOutlinedIcon />
      </Grid>
    </Grid>
  );
};

export default TodoCard;
