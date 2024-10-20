import {createContext} from 'react';

const TaskContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    editOpen: false,
    setEditOpen: () => {},
    tasks: [],
    setTasks: () => {},
    selectedTask: null,
    setSelectedTask: () => {}
})

export default TaskContext;