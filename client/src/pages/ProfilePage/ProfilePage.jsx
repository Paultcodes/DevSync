import './profilepage.css';
import { pics } from './pics';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const { loading, data } = useQuery(GET_ME);
  const [picSource, setPicSource] = useState('')

  const userData = data?.me || {};

  useEffect(() => {
    if(userData){
        setPicSource(pics[userData.firstName?.charAt(0).toLowerCase()])
    }
  },[userData])


  console.log(userData);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="profile-page">
      <div className="profile-left section">
        <div className="profile-picture">
           <img className='letter-profile' alt='User Letter' src={picSource}></img>
        </div>
        <div className="info-section">
          <h3>Profile</h3>
          <div>
            <p>{userData.email}</p>
            <p>GitHub</p>
          </div>
        </div>
        <div className="text-align">
          <h1>
            {userData.firstName} {userData.lastName}
          </h1>
          <p>Software Engineer</p>
        </div>
        <Link className="settings-button" to="/settings">
          <FaCog />
        </Link>
      </div>
      <div className="profile-right section">
        <div className="about-me text-align">
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quas
            minima quidem possimus corporis nesciunt at, enim provident
            laboriosam, dolores quae accusantium blanditiis! Repellat iure
            accusantium voluptatem ad alias unde?
          </p>
        </div>
        <div className="tech-skills">
          {userData.skills.map((tag) => {
            return <p className="skill">{tag}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
