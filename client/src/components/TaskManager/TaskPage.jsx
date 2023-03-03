import TaskCard from './TaskCard';
import TaskForm from './TaskManager';
import './TaskPage.css'


const TaskPage = () => {
  return (
    <div className='task-page-section'>
      <div className="form-section">
        <TaskForm />
      </div>
      <div className='tasks'>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
      </div>
    </div>
  );
};

export default TaskPage;
