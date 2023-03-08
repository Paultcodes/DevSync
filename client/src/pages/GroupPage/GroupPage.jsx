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
import { useQuery, useMutation } from '@apollo/client';
import { GET_GROUP } from '../../utils/queries';
import { ADD_MEMBER } from '../../utils/mutations';
import { ButtonOne } from '../../components/buttons/Buttons';

export const GroupDataContext = createContext();

const GroupPage = () => {
  const [addMember, { data: addMemberData, error: addMemberError }] =
    useMutation(ADD_MEMBER);
  const [currentSection, setCurrentSection] = useState('chat');
  const { groupId } = useParams();

  const { loading, data, error, refetch } = useQuery(GET_GROUP, {
    variables: { groupId: groupId },
  });

  const handleAddMember = async () => {
    try {
      const { data } = addMember({
        variables: { groupId: groupId },
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const groupData = data?.getGroup || {};
  console.log(error);

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading</h1>;
  }

  console.log(groupData);

  if (!groupData.isMember) {
    return (
      <div>
        <h1>Would You like to join this group? </h1>
        <ButtonOne buttonName="Join" onClick={handleAddMember} />
      </div>
    );
  }
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
            <GroupChat refetch={refetch}/>
          ) : currentSection === 'tasks' ? (
            <TaskPage refetch={refetch} />
          ) : currentSection === 'members' ? (
            <MemberSection groupOwner={groupData.isGroupOwner}/>
          ) : (
            <GroupSettings />
          )}
        </div>
      </div>
      <div></div>
    </GroupDataContext.Provider>
  );
};

export default GroupPage;
