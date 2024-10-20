import React, { useContext } from 'react';
import TaskCard from './TaskCard.jsx';
import TaskContext from "../context/TaskContext.jsx";

const AllTasks = () => {
    const { tasks } = useContext(TaskContext);

    return (
        <>
            <h1 className="text-center font-bold text-2xl mt-4">All Tasks</h1>
            <div className="mx-auto mt-8 max-w-7xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <TaskCard
                                key={index}
                                id={task._id}
                                title={task.title}
                                priority={task.priority}
                                endDate={task.dueDate}
                                status={task.status}
                            />
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center mt-52 p-6 rounded-lg shadow-md">
                            <h2 className="font-bold text-xl mb-2">No Tasks Yet</h2>
                            <p className="text-gray-500">
                                Create your first task!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllTasks;
