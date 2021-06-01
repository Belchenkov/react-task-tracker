import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addTask = async task => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await res.json();

        setTasks([...tasks, data]);
    };

    const deleteTask = async id => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleReminder = async id => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json();

        setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder} : task));
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

    const fetchTask = async id => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        return await res.json();
    };

    return (
        <Router>

            <div className="container">
                <Header
                    title="Task Tracker"
                    showAddForm={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                { showAddTask && <AddTask onAddTask={addTask} /> }

                <Route path='/' exact render={props => (
                    <>
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
                    </>
                )} />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
  );
}

export default App;
