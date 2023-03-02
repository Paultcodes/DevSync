import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-card__header">Testing</div>
      <div className="task-card__body">
        <div className="task-card__assignee">John Smith</div>
        <div className="task-card__description">
          Take care of the styling on the front page
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
