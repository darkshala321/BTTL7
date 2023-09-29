import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');

    // Đẩy công việc mới vào tab "All" nhưng chưa đánh dấu là hoàn thành
    setActiveTasks([...activeTasks, newTask]);
  };

  const deleteTask = (taskId, sourceTab) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Xóa task khỏi tab "All"
    if (sourceTab === 'All') {
      setActiveTasks(activeTasks.filter((task) => task.id !== taskId));
    }

    // Xóa task khỏi tab "Active"
    if (sourceTab === 'Active') {
      setActiveTasks(activeTasks.filter((task) => task.id !== taskId));
    }

    // Xóa task khỏi tab "Completed"
    if (sourceTab === 'Completed') {
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    }
  };

  const toggleTask = (taskId, sourceTab) => {
    const updatedActiveTasks = activeTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setActiveTasks(updatedActiveTasks);

    // Nếu task đang trong tab "Active" và được đánh dấu hoàn thành, chuyển sang tab "Completed"
    if (sourceTab === 'Active') {
      if (updatedActiveTasks.find((task) => task.id === taskId).completed) {
        const taskToMove = updatedActiveTasks.find((task) => task.id === taskId);
        setCompletedTasks([...completedTasks, taskToMove]);
        setActiveTasks(activeTasks.filter((task) => task.id !== taskId));
      }
    }
  };

  return (
    <div className='container'>
      <div className='main'>
        <h1>TO DO LIST</h1>
        <input
          className='todolist-input'
          type="text"
          placeholder="Thêm công việc mới"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Thêm</button>
        <div className='tab-task'>
          <Tabs>
            <TabList>
              <Tab>All</Tab>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanel>
              <ul className='task'>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      onChange={() => {
                        toggleTask(task.id, 'All');
                        deleteTask(task.id, 'All');
                      }}
                    />
                    <span>{task.text}</span>
                    <button onClick={() => deleteTask(task.id, 'All')}>Xóa</button>
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul className='task'>
                {activeTasks.map((task) => (
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, 'Active')}
                    />
                    <span
                      style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => deleteTask(task.id, 'Active')}>Xóa</button>
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel>
              <ul className='task'>
                {completedTasks.map((task) => (
                  <li key={task.id}>
                    <span
                      style={{
                        textDecoration: 'line-through',
                      }}
                    >
                      {task.text}
                    </span>
                    <button onClick={() => deleteTask(task.id, 'Completed')}>Xóa</button>
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
