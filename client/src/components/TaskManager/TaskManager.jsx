import React, { useState } from 'react';
import './TaskManagerStyle.css';
import TaskCard from './TaskCard';

const TaskForm = ({ onSave }) => {
  const [task, setTask] = useState({ assignee: '', description: '', type: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(task);
    setTask({ assignee: '', description: '', type: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <label className="task-form__label">
          Assignee:
          <input
            type="text"
            name="assignee"
            value={task.assignee}
            onChange={handleInputChange}
            className="task-form__input"
          />
        </label>
        <label className="task-form__label">
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="task-form__input"
          />
        </label>
        <label className="task-form__label">
          Type:
          <select
            name="type"
            value={task.type}
            onChange={handleInputChange}
            className="task-form__input"
          >
            <option value="">Select a task type</option>
            <option value="front-end">Front-end</option>
            <option value="back-end">Back-end</option>
            <option value="styling">Styling</option>
            <option value="database-work">Database work</option>
          </select>
        </label>
        <button type="submit" className="task-form__button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
