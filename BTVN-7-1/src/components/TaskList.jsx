import React from 'react';

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{ textDecoration: task.completed ? 'line-through' : 'none', backgroundColor: task.completed ? '#eee' : 'transparent' }}
        >
          <span onClick={() => onToggleTask(task.id)}>{task.text}</span>
          <button onClick={() => onDeleteTask(task.id)}>Xóa</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;