import React, { useState, useContext } from 'react';
import './TaskManagerStyle.css';
import TaskCard from './TaskCard';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CREATE_TASK } from '../../utils/mutations';
import { GET_GROUP } from '../../utils/queries';
import { GroupDataContext } from '../../pages/GroupPage/GroupPage';

const TaskForm = ({ refetch }) => {
  const tasks = useContext(GroupDataContext);
  const [createTask, {data, error}] = useMutation(CREATE_TASK)
  const { groupId } = useParams();
  const [task, setTask] = useState({ assignee: '', description: '', type: '' });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(task)
    console.log(groupId)

    try {
      const {data} = createTask({
        variables: {...task, groupId}
      })
      refetch()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    

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
        <button onClick={handleSubmit} className="task-form__button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
