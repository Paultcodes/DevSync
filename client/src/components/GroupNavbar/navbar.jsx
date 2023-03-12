import "./navbar.css";
import { FaRocketchat, FaTasks, FaUsers, FaCog } from "react-icons/fa";
import { useContext } from "react";
import { GroupDataContext } from "../../pages/GroupPage/GroupPage";

export const navColors = {
  grey: "grey",
  white: "white"
};

export const navTypes = {
  chat: "chat",
  tasks: "tasks",
  members: "members",
  settings: "settings"
};

const Navbar = ({ currentSection, setCurrentSection }) => {
  const groupData = useContext(GroupDataContext);

  const iconSwitch = (section) => {
    const sections = {
      chat: <FaRocketchat />,
      tasks: <FaTasks />,
      members: <FaUsers />,
      settings: <FaCog />,
      "": <></>
    };
    return sections[section];
  };

  const NavLinks = () =>
    ["chat", "tasks", "members", "settings"].map((section, id) => (
      <li
        style={{
          backgroundColor: currentSection === section && "grey",
          borderRadius: "10px",
          padding: "7px",
          color: currentSection === section && "white"
        }}
        onClick={() => setCurrentSection(section)}
        key={id}
      >
        {iconSwitch(section)}
      </li>
    ));

  return (
    <div className="group-navbar">
      <h1>{groupData.groupName} Channel</h1>
      <ul className="navbar-links">{NavLinks()}</ul>
    </div>
  );
};

export default Navbar;
