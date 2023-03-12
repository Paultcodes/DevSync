import "./profilepage.css";
import { pics } from "./pics";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { useEffect, useState, useMemo } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { INVITE_RESPONSE } from "../../utils/mutations";
import auth from "../../utils/auth";

const ProfilePage = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [picSource, setPicSource] = useState("");
  const [inviteResponse, { error, data: responseData }] =
    useMutation(INVITE_RESPONSE);

  const handleResponse = async (groupId, inviteId, response) => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return;
    }

    try {
      await inviteResponse({
        variables: { groupId, inviteId, response }
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const userData = useMemo(() => data?.me || {}, [data]);

  useEffect(() => {
    if (userData) {
      setPicSource(pics[userData.firstName?.charAt(0).toLowerCase()]);
    }
  }, [userData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const { firstName, lastName, email, invites, skills } = userData;
  return (
    <div className="profile-page">
      <div className="profile-left section">
        <div className="profile-picture">
          <img
            className="letter-profile"
            alt="User Letter"
            src={picSource}
          ></img>
        </div>
        <div className="info-section">
          <h3>Profile</h3>
          <div>
            <p>{email}</p>
            <p>GitHub</p>
          </div>
        </div>
        <div className="text-align">
          <h1>
            {firstName} {lastName}
          </h1>
          <p>Software Engineer</p>
        </div>
        <Link className="settings-button" to="/settings">
          <FaCog />
        </Link>
      </div>

      <div className="middle-section section">
        {invites.length === 0 && <p>No invites</p>}
        {invites.map((invite) => {
          return (
            <div className="invite-card">
              {invite.group.groupName} has invited you to join their group
              <div className="invite-buttons">
                <button
                  onClick={() =>
                    handleResponse(invite.group._id, invite._id, "accept")
                  }
                >
                  ✅
                </button>
                <button
                  onClick={() =>
                    handleResponse(invite.group._id, invite._id, "decline")
                  }
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })}
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
          {skills.length > 0 ? (
            skills.map((data) => {
              return <p className="skill">{data}</p>;
            })
          ) : (
            <p>You have no listed skills</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
