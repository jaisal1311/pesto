import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).send({ todos });
  } catch (error) {
    throw new Error(error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      throw new Error("Please provide valid details");
    }
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        status: "Todo",
      },
    });
    res.status(201).send({ data: { todo } });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).send({ id });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { status, id } = req.body;
    const todo = await prisma.todo.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
    res.status(200).send({ todo });
  } catch (error) {
    throw new Error(error);
  }
};
