import React from 'react';
import './TaskCard.css';

const TaskCard = ({ assignee, description, type}) => {
  return (
    <div className="task-card">
      <div className="task-card__header">Task</div>
      <div className="task-card__body">
        <div className="task-card__assignee">{assignee}</div>
        <div className="task-card__description">
          {description}
        </div>
        <div style={{fontSize: '13px', color: 'grey'}} className="task-card__description">
          {type}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
