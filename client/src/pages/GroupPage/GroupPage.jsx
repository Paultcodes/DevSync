import "./groupage.css";
// import Navbar from './GroupNavbar/navbar';
import Navbar from "../../components/GroupNavbar/navbar";
import GroupChat from "../../components/GroupChat/GroupChat";
// import TaskPage from './TaskManager/TaskPage';
import TaskPage from "../../components/TaskManager/TaskPage";
import MemberSection from "../../components/MemberSection/MemberSection";
import GroupSettings from "../../components/GroupSettings/GroupSettings";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GROUP } from "../../utils/queries";
import { ADD_MEMBER } from "../../utils/mutations";
import { ButtonOne } from "../../components/buttons/Buttons";

export const GroupDataContext = createContext();

const GroupPage = () => {
  const [addMember, { data: addMemberData, error: addMemberError }] =
    useMutation(ADD_MEMBER);
  const [currentSection, setCurrentSection] = useState("chat");
  const { groupId } = useParams();

  const { loading, data, error, refetch } = useQuery(GET_GROUP, {
    variables: { groupId: groupId }
  });

  const handleAddMember = async () => {
    try {
      await addMember({
        variables: { groupId: groupId }
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const groupData = data?.getGroup || {};
  console.log(error);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading</h1>;
  }

  if (!groupData.isMember) {
    const memLength = groupData.members.length;
    return (
      <div className="join">
        <h1>Would You like to join this group? </h1>
        <ButtonOne buttonName="Join" onClick={handleAddMember} />
        <p>
          {memLength} {memLength > 1 || memLength === 0 ? "members" : "member"}
        </p>
        <div>
          {groupData.tags.map((tag) => {
            return <p>{tag}</p>;
          })}
        </div>
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
          {currentSection === "chat" ? (
            <GroupChat refetch={refetch} />
          ) : currentSection === "tasks" ? (
            <TaskPage refetch={refetch} />
          ) : currentSection === "members" ? (
            <MemberSection
              groupMembers={groupData.members}
              groupOwner={groupData.isGroupOwner}
            />
          ) : (
            <GroupSettings refetch={refetch} />
          )}
        </div>
      </div>
    </GroupDataContext.Provider>
  );
};

export default GroupPage;
