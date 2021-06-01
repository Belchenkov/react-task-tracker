import { useEffect, useState } from 'react';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addTask = task => {
        const id = Math.floor(Math.random() * 1000) + 1;
        const newTask = {
            id,
            ...task
        };

        setTasks([...tasks, newTask]);
    };

    const deleteTask = async id => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleReminder = id => {
        setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder} : task));
    };

    useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks();
          setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        return await res.json();
    };

    return (
        <div className="container">
            <Header
                title="Task Tracker"
                showAddForm={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />
            { showAddTask && <AddTask onAddTask={addTask} /> }
            { tasks.length > 0 ? (
                    <Tasks
                        onDelete={deleteTask}
                        onToggle={toggleReminder}
                        tasks={tasks}
                    />
                ) : (
                    'No Tasks To Show'
                )
            }
        </div>
  );
}

export default App;
