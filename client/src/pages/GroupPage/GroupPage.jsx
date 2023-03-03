import './groupage.css';
// import Navbar from './GroupNavbar/navbar';
import Navbar from '../../components/GroupNavbar/navbar';
import GroupChat from '../../components/GroupChat/GroupChat';
// import TaskPage from './TaskManager/TaskPage';
import TaskPage from '../../components/TaskManager/TaskPage';
import MemberSection from '../../components/MemberSection/MemberSection';
import GroupSettings from '../../components/GroupSettings/GroupSettings';
import { useState } from 'react';

const GroupPage = () => {
  const [currentSection, setCurrentSection] = useState('chat');
  return (
    <div className="main-group-div">
      <div className="top-homepage">
        <Navbar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </div>
      <div className="content-section">
        {currentSection === 'chat' ? (
          <GroupChat/>
        ): currentSection === 'tasks' ? (
          <TaskPage/>
        ) : currentSection === 'members' ?(
          <MemberSection/>
        ) : (
          <GroupSettings/>
        )}
        
      </div>
    </div>
  );
};

export default GroupPage;
