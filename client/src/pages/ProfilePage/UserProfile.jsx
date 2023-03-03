import './profilepage.css';
import ProfilePic from '../../images/alphabet/c.png';
import { pics } from './pics';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../utils/queries';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  console.log(userId)
  const { loading, data } = useQuery(GET_PROFILE, {
    variables: { userId: userId },
  });

  const profileData = data?.getProfile || {};

  console.log(profileData)

  return (
    <div className="profile-page">
      <div className="profile-left section">
        <div className="profile-picture"></div>
        <div className="info-section">
          <h3>Profile</h3>
          <div>
            <p></p>
            <p>GitHub</p>
          </div>
        </div>
        <div className="text-align">
          <h1>
            
          </h1>
          <p>Software Engineer</p>
        </div>
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
          <p className="skill">Javascript</p>
          <p className="skill">React</p>
          <p className="skill">Python</p>
          <p className="skill">CSS</p>
          <p className="skill">CSS</p>
          <p className="skill">CSS</p>
          <p className="skill">CSS</p>
          <p className="skill">CSS</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
