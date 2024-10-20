import { useContext, useState } from 'react';
import axios from "axios";
import TaskContext from "../context/TaskContext.jsx";
import {api} from "../api/base.js";
import {toast, ToastContainer} from "react-toastify";

const AddTaskCard = () => {

    const { setIsOpen } = useContext(TaskContext);
    const [formData, setFormData] = useState({
        title: "",
        priority: "medium",
        dueDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await api.post("/task/create", formData);


            window.location.reload();
            toast.success(res.data.message, {
                position: "top-right",
            });

        } catch (e) {
            console.log(e);

        } finally {
            setIsOpen(false);
        }
    };

    return (
        <div className="flex bg-white justify-center items-center p-8 shadow-2xl rounded-xl text-lg">
            <div className="w-full max-w-md flex gap-16 items-center">
                <h1 className="text-2xl font-bold mb-6 text-center">Add New Task</h1>
                <form onSubmit={handleAdd} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Task Title</label>
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
                        <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">Priority</label>
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
                        <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">Due Date</label>
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

                    <div className="flex space-x-4">
                        <button className="w-full bg-black text-white font-bold rounded py-2" type="submit">
                            Add
                        </button>
                        <button
                            type="button"
                            className="w-full bg-gray-300 text-black font-bold rounded py-2 hover:bg-gray-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default AddTaskCard;
