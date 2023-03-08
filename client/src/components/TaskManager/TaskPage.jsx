import TaskCard from './TaskCard';
import TaskForm from './TaskManager';
import './TaskPage.css';
import { GroupDataContext } from '../../pages/GroupPage/GroupPage';
import { useContext } from 'react';

const TaskPage = ({refetch}) => {
  const tasks = useContext(GroupDataContext);
  console.log(tasks.tasks);
  return (
    <div className="task-page-section">
      <div className="form-section">
        <TaskForm refetch={refetch}/>
      </div>
      <div className="tasks">
        {tasks.tasks.length > 0 ? (
          tasks.tasks.map((task) => {
            return (
              <TaskCard
                assignee={task.assignee}
                description={task.description}
                type={task.type}
              />
            );
          })
        ) : (
          <>No tasks</>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
