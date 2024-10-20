import { Router } from "express";
import { createTask, deleteTask, getAllUserTask, getSingleTask, updateStatus, updateTask } from "../controllers/task.controller.js";
import { getUser } from "../middlewares/get-user.middleware.js";
import { createTaskSchema, updateTaskSchema, updateStatusSchema, taskIdSchema } from "../validators/task.validator.js";
import {validateTaskRequest} from "../middlewares/validation.middleware.js";

const taskRouter = Router();

taskRouter
    .post("/create", getUser, validateTaskRequest(createTaskSchema), createTask)
    .get("/all", getUser, getAllUserTask)
    .get("/:id", validateTaskRequest(taskIdSchema, 'params'), getSingleTask)
    .put("/:id", validateTaskRequest(taskIdSchema, 'params'), validateTaskRequest(updateTaskSchema), updateTask)
    .patch("/status/:id", validateTaskRequest(taskIdSchema, 'params'), validateTaskRequest(updateStatusSchema), updateStatus)
    .delete("/:id", validateTaskRequest(taskIdSchema, 'params'), deleteTask)

export { taskRouter };
