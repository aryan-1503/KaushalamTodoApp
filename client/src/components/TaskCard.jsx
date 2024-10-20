import { useContext } from 'react';
import axios from 'axios';
import TaskContext from '../context/TaskContext.jsx';
import {api} from "../api/base.js";
import {toast} from "react-toastify";

const TaskCard = ({ id, title, priority, endDate, status }) => {
    const { setEditOpen, setSelectedTask } = useContext(TaskContext);

    const handleEditOpen = () => {
        setSelectedTask({ id, title, endDate, status });
        setEditOpen(true);
    };

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            const res = await api.delete(`/task/${id}`);
            setTimeout(() => {
                toast.success(res.data.message, {
                    position: "top-right",
                });
            },2000)
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message,{
                    position: "top-right"
                })
            } else {
                console.log(error)
            }
            console.log(error)
        }
    };

    const priorityColor = {
        low: 'bg-green-500 text-green-800',
        medium: 'bg-yellow-500 text-yellow-800',
        high: 'bg-red-500 text-red-900',
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={`bg-white rounded-xl shadow-xl px-6 py-6 flex flex-col justify-between w-80 space-y-4 ${status === 'completed' && 'opacity-50'}`}>
            <div className="w-full flex justify-between items-center">
                <h2 className="font-bold text-xl text-left">{title}</h2>
                <div className={`py-1 px-3 rounded font-semibold ${priorityColor[priority]}`}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
                <div className="text-lg">
                    <strong>Due date:</strong> {formatDate(endDate)}
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
                <div className="text-lg">
                    <strong>Status:</strong> {status}
                </div>
            </div>

            <div className="w-full flex flex-col space-y-2">
                <button
                    className="bg-black text-white font-bold rounded py-2 w-full"
                    onClick={handleEditOpen}
                >
                    Edit
                </button>
                <button
                    className="bg-red-700 text-white font-bold rounded py-2 w-full"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
