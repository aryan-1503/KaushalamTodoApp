import {TaskModel} from "../models/task.model.js";
import {UserModel} from "../models/user.model.js";


const createTask = async (req,res) => {
    const { title, priority, dueDate } = req.body;
    try{
        const task = await TaskModel.findOne({ title });
        if(task) {
            return res.status(406).json({ success: false,message: "Task already exists"})
        }

        const newTask = new TaskModel({ title, priority, dueDate });
        const savedTask = await newTask.save();

        const user = req.user;
        user.tasks.push(savedTask._id);

        await user.save();

        return res.status(200).json({ success: true, message: "Task added", savedTask, user })

    }catch (error) {
        console.log(error)
    }
}

const getAllUserTask = async (req,res) => {
    try{
        const userId = req.user._id;
        const user = await UserModel.findById(userId).populate("tasks");
        const tasks = user.tasks;
        res.status(200).json({ success: true, tasks })
    }catch (error) {
        console.log(error)
    }
}

const getSingleTask = async (req,res) => {
    const { id } = req.params;
    try{
        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({ success: false, message: "Task not found"})
        }
        res.status(200).json({ success: true,message: "Task Found", task })
    }catch (error) {
        console.log(error)
    }
}

const updateTask = async (req,res) => {
    const { id } = req.params;
    try{
        const task = await TaskModel.findByIdAndUpdate(id,{...req.body},{ new: true });
        res.status(200).json({ success: true, message: "Task updated successfully", task })
    }catch (error) {
        console.log(error)
    }
}

const updateStatus =  async (req,res) => {
    const {
        body,
        params: { id }
    } = req
    try{
        const task = await TaskModel.findByIdAndUpdate(id, {...body}, { new: true });
        res.status(200).json({ success: true, message: "Task updated successfully", task })
    }catch (error) {
        console.log(error)
    }
}

const deleteTask = async (req,res) => {
    const {
        params: { id }
    } = req
    try {
        const task = await TaskModel.findByIdAndDelete(id, { new: true});
        res.status(201).json({ success: true, message: "Task deleted", task})
    }catch (error) {
        console.log(error)
    }
}

export { createTask, getAllUserTask, getSingleTask, updateTask, updateStatus, deleteTask }