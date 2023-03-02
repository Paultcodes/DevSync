import './navbar.css';
import { FaRocketchat, FaTasks, FaUsers, FaCog } from 'react-icons/fa';
import { navColors, navTypes } from './style';

const Navbar = ({ currentSection, setCurrentSection }) => {
  return (
    <div className="group-navbar">
      <h1>Top Coders Channel</h1>
      <ul className="navbar-links">
        <li
          style={{
            backgroundColor: currentSection === navTypes.chat && navColors.grey,
            borderRadius: '10px',
            padding: '7px',
            color: currentSection === navTypes.chat && navColors.white,
          }}
          onClick={() => {
            setCurrentSection(navTypes.chat);
          }}
        >
          <FaRocketchat />
        </li>
        <li
          style={{
            backgroundColor:
              currentSection === navTypes.tasks && navColors.grey,
            borderRadius: '10px',
            padding: '7px',
            color: currentSection === navTypes.tasks && navColors.white,
          }}
          onClick={() => {
            setCurrentSection(navTypes.tasks);
          }}
        >
          <FaTasks />
        </li>
        <li
          style={{
            backgroundColor:
              currentSection === navTypes.members && navColors.grey,
            borderRadius: '10px',
            padding: '7px',
            color: currentSection === navTypes.members && navColors.white,
          }}
          onClick={() => {
            setCurrentSection(navTypes.members);
          }}
        >
          <FaUsers />
        </li>
        <li
          style={{
            backgroundColor:
              currentSection === navTypes.settings && navColors.grey,
            borderRadius: '10px',
            padding: '7px',
            color: currentSection === navTypes.settings && navColors.white,
          }}
          onClick={() => {
            setCurrentSection(navTypes.settings);
          }}
        >
          <FaCog />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
