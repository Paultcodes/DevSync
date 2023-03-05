import './groupage.css';
// import Navbar from './GroupNavbar/navbar';
import Navbar from '../../components/GroupNavbar/navbar';
import GroupChat from '../../components/GroupChat/GroupChat';
// import TaskPage from './TaskManager/TaskPage';
import TaskPage from '../../components/TaskManager/TaskPage';
import MemberSection from '../../components/MemberSection/MemberSection';
import GroupSettings from '../../components/GroupSettings/GroupSettings';
import { createContext, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GROUP } from '../../utils/queries';

export const GroupDataContext = createContext();

const GroupPage = () => {
  const [currentSection, setCurrentSection] = useState('chat');
  const { groupId } = useParams();

  const { loading, data } = useQuery(GET_GROUP, {
    variables: { groupId: groupId },
  });

  const groupData = data?.getGroup || {};

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading</h1>;
  }

  console.log(groupData);
  return (
    <GroupDataContext.Provider value={groupData}>
      <div className="main-group-div">
        <div className="top-homepage">
          <Navbar
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        </div>
        <div className="content-section">
          {currentSection === 'chat' ? (
            <GroupChat />
          ) : currentSection === 'tasks' ? (
            <TaskPage />
          ) : currentSection === 'members' ? (
            <MemberSection />
          ) : (
            <GroupSettings />
          )}
        </div>
      </div>
    </GroupDataContext.Provider>
  );
};

export default GroupPage;
