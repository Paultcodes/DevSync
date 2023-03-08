import React from "react";
import "./UserCard.css";
import ProfilePic from '../../images/images.png'

const UserCard = (props) => {
  

  return (
    <div className="user-card">
      <img className="user-card__avatar" src={ProfilePic}  alt="User avatar" />
      <div className="user-card__body">
        <div className="user-card__name">{props.username}</div>
        <div className="user-card__email">{props.email}</div>
      </div>
    </div>
  );
};

export default UserCard;