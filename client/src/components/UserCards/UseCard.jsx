import React from "react";
import "./UserCard.css";
import ProfilePic from '../../images/images.png'

const UserCard = ({ user }) => {
  

  return (
    <div className="user-card">
      <img className="user-card__avatar" src={ProfilePic}  alt="User avatar" />
      <div className="user-card__body">
        <div className="user-card__name">Paul</div>
        <div className="user-card__email">paul@mail.com</div>
      </div>
    </div>
  );
};

export default UserCard;