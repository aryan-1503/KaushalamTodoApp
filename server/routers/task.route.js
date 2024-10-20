import { Router } from "express";
import { createTask, deleteTask, getAllUserTask, getSingleTask, updateStatus, updateTask } from "../controllers/task.controller.js";
import { getUser } from "../middlewares/get-user.middleware.js";
import { createTaskSchema, updateTaskSchema, updateStatusSchema, taskIdSchema } from "../validators/task.validator.js";
import {validateTaskRequest} from "../middlewares/validation.middleware.js";

const taskRouter = Router();

taskRouter
    .post("/create", getUser, validateTaskRequest(createTaskSchema), createTask)  // Apply validation for task creation
    .get("/all", getUser, getAllUserTask)
    .get("/:id", validateTaskRequest(taskIdSchema, 'params'), getSingleTask)  // Validate task id in params
    .put("/:id", validateTaskRequest(taskIdSchema, 'params'), validateTaskRequest(updateTaskSchema), updateTask)  // Validate task id and body
    .patch("/status/:id", validateTaskRequest(taskIdSchema, 'params'), validateTaskRequest(updateStatusSchema), updateStatus)  // Validate task id and status
    .delete("/:id", validateTaskRequest(taskIdSchema, 'params'), deleteTask)  // Validate task id for deletion

export { taskRouter };
