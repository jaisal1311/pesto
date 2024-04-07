import express from "express";

const router = express.Router();

// Todo routes

import todo from "@routes/todo";

router.use(todo);

export default router;
