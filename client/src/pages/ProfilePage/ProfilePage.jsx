import './profilepage.css';
import ProfilePic from '../../images/alphabet/c.png';
import { pics } from './pics';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { useEffect, useState } from 'react';


const ProfilePage = () => {
  const { loading, data } = useQuery(GET_ME);
  const [picSource, setPicSource] = useState('')

  const userData = data?.me || {};

  useEffect(() => {
    if(userData){
        setPicSource(pics[userData.firstName?.charAt(0).toLowerCase()])
    }
  },[userData])

  // if(userData){
  //   console.log(userData.firstName?.charAt(0).toLowerCase())
  // }  else {
  //   console.log('no data')
  // }

// console.log(userData)



  // const letter = userData.firstName.charAt(0).toLowerCase()
  // console.log(letter)

  // const picSource = pics.a

  return (
    <div className="profile-page">
      <div className="profile-left section">
        <div className="profile-picture">
           <img src={picSource}></img>
        </div>
        <div className="info-section">
          <h3>Profile</h3>
          <div>
            <p>{userData.email}</p>
            <p>GitHub</p>
          </div>
        </div>
        <div className="text-align">
          <h1>{userData.firstName} {userData.lastName}</h1>
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

export default ProfilePage;
