import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import TaskContext from '../context/TaskContext.jsx';
import { api } from "../api/base.js";
import { toast, ToastContainer } from "react-toastify";

const EditTaskCard = ({ id, title, endDate, status, priority }) => {
    const { setEditOpen } = useContext(TaskContext);

    const [formData, setFormData] = useState({
        title: title || "",
        priority: priority || "medium",
        dueDate: "",
        status: status === 'completed',
    });

    // Set the dueDate from props if it exists
    useEffect(() => {
        if (endDate) {
            setFormData((prevData) => ({
                ...prevData,
                dueDate: endDate.split('T')[0], // Format the date correctly for the input
            }));
        }
    }, [endDate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked ? 'completed' : 'pending') : value,
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await api.put(`/task/${id}`, formData);
            setTimeout(() => {
                toast.success(res.data.message, {
                    position: "top-right"
                })
            }, 2000)
            window.location.reload();

        } catch (error) {
            console.log(error);
        } finally {
            setEditOpen(false);
        }
    };

    return (
        <div className="flex bg-white justify-center items-center p-8 shadow-2xl rounded-xl text-lg gap-4">
            <div className="w-full max-w-md flex gap-16 items-center">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Task</h1>
                <form onSubmit={handleEdit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Task Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={handleChange}
                            value={formData.title}
                            required
                            className="w-full border-2 border-black rounded p-2 placeholder:text-gray-800"
                        />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full border-2 border-black rounded p-2"
                            required
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">Due Date</label>
                        <input
                            id="dueDate"
                            type="date"
                            name="dueDate"
                            onChange={handleChange}
                            value={formData.dueDate}
                            required
                            className="w-full border-2 border-black rounded p-2"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="isCompleted"
                            type="checkbox"
                            name="status"
                            onChange={handleChange}
                            checked={status}
                            className="w-5 h-5"
                        />
                        <label htmlFor="status" className="text-lg font-semibold">
                            Task Completed
                        </label>
                    </div>

                    <div className="flex space-x-4">
                        <button className="w-full bg-black text-white font-bold rounded py-2" type="submit">
                            Save
                        </button>
                        <button
                            type="button"
                            className="w-full bg-gray-300 text-black font-bold rounded py-2 hover:bg-gray-400"
                            onClick={() => setEditOpen(false)}
                        >
                            Close
                        </button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskCard;
