import React, { useContext, useEffect, useState } from 'react';
import AllTasks from "../components/AllTasks.jsx";
import AuthContext from "../context/AuthContext.jsx";
import { Link } from 'react-router-dom';
import TaskContext from "../context/TaskContext.jsx";
import AddTaskCard from "../components/AddTaskCard.jsx";
import EditTaskCard from "../components/EditTaskCard.jsx";
import { api } from "../api/base.js";
import Loading from "../components/Loading/Loading.jsx";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTask, setSelectedTask] = useState({});
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                setLoading(true);
                const res = await api.get('/task/all');
                setTasks(res.data.tasks);
                setFilteredTasks(res.data.tasks);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTasks(filtered);
        }
    }, [searchQuery, tasks]);

    return (
        <div className="h-screen flex justify-center">
            {user ? (
                <TaskContext.Provider value={{ isOpen, setIsOpen, editOpen, setEditOpen, tasks, setTasks, selectedTask, setSelectedTask }}>
                    <div className="">
                        {isOpen && (
                            <>
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[500]"
                                    onClick={handleClose}
                                ></div>
                                <div className="fixed inset-0 flex justify-center items-center z-[999]">
                                    <AddTaskCard />
                                </div>
                            </>
                        )}
                        {editOpen && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[500]"></div>
                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[999]">
                                    <EditTaskCard {...selectedTask} />
                                </div>
                            </>
                        )}
                        {loading ? (
                            <div className="h-screen w-screen flex items-center justify-center">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-center my-4">
                                    <input
                                        type="text"
                                        placeholder="Search tasks by title..."
                                        className="p-2 border rounded-md w-96"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value) }
                                    />
                                </div>

                                {/* Pass filteredTasks instead of tasks */}
                                <AllTasks tasks={filteredTasks} />
                            </>
                        )}

                        <div className="fixed right-24 bottom-16 z-50">
                            <button
                                onClick={handleOpen}
                                className="bg-black text-white p-3 shadow-2xl rounded-xl border border-b-gray-100 font-bold text-md"
                            >
                                New Task
                            </button>
                        </div>
                    </div>
                </TaskContext.Provider>
            ) : (
                <div className="mt-52 text-center space-y-6">
                    <h2 className="text-3xl font-semibold">Welcome to Kaushalam</h2>
                    <p className="text-lg">Please login or sign up to manage your tasks.</p>
                    <div className="space-x-4">
                        <Link to="/login">
                            <button className="px-6 py-3 bg-gray-200 text-black font-semibold rounded hover:bg-gray-100 transition duration-300">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-6 py-3 border border-white bg-black  text-white font-semibold rounded hover:bg-gray-900 transition duration-300">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
