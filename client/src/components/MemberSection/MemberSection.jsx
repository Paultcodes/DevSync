import UserCard from '../UserCards/UseCard';
import {
  ButtonOne,
  ButtonTwo,
  ButtonThree,
  ButtonFour,
} from '../buttons/Buttons';
import './membersection.css';
import { useState } from 'react';
import { InputOne, TextArea, InputTwo } from '../inputs/Inputs';
import { Link } from 'react-router-dom';
import { SEARCH_USER } from '../../utils/queries';
import {
  CREATE_HELP_WANTED,
  INVITE_USER_TO_GROUP,
} from '../../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { FaSearch, FaPencilAlt, FaUser, FaPlus } from 'react-icons/fa';
import auth from '../../utils/auth';

const MemberSection = ({ groupOwner }) => {
  const [showInviteResponse, setShowInviteResponse] = useState(false);
  const [showHelpResponse, setShowHelpResponse] = useState(false);
  const { groupId } = useParams();

  const [inviteUserToGroup, { data: inviteUserData, error: inviteUserError }] =
    useMutation(INVITE_USER_TO_GROUP);

  const [createHelpWanted, { data: createData, error: createError }] =
    useMutation(CREATE_HELP_WANTED);

  const [helpWantedForm, setHelpWantedForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setHelpWantedForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(helpWantedForm);
  };

  const handleInvite = async (userId) => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await inviteUserToGroup({
        variables: { groupId, userId },
      });
      setShowInviteResponse(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(helpWantedForm);
    console.log(groupId);

    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await createHelpWanted({
        variables: { ...helpWantedForm, groupId },
      });
      setShowHelpResponse(true);
      setHelpWantedForm({
        title: '',
        description: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [searchType, setSearchType] = useState(null);

  const [searched, setSearched] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [renderForm, setRenderForm] = useState('');

  const [searchUser, { loading, error, data }] = useLazyQuery(SEARCH_USER);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const searchForUser = () => {
    if (searchTerm) {
      setSearched(true);
      searchUser({ variables: { username: searchTerm } });
    }
  };

  const user = data?.searchUser;

  console.log(user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="member-section">
      {groupOwner && (
        <div className="button-section">
          <ButtonOne
            buttonName={<FaPencilAlt />}
            onClick={() => setRenderForm('help')}
          >
            {' '}
            Post A Help Wanted Ad
          </ButtonOne>
          <ButtonOne
            buttonName={<FaPlus />}
            onClick={() => setRenderForm('invite')}
          >
            {' '}
            Invite A User
          </ButtonOne>
        </div>
      )}
      {renderForm === 'invite' ? (
        <div className="invite-form">
          <div className="search-user">
            <InputOne onChange={handleSearch} placeholder="Username" />
            <ButtonOne onClick={searchForUser}>
              <FaSearch />
            </ButtonOne>
          </div>
        </div>
      ) : (
        renderForm === 'help' && (
          <div className="help-wanted">
            {showHelpResponse && <p>Help Wanted Posted ✅</p>}
            <InputTwo
              name="title"
              onChange={handleChange}
              placeholder="Title"
            />
            <TextArea
              name="description"
              onChange={handleChange}
              placeholder="Description"
            />
            <ButtonOne buttonName="Submit" onClick={handleSubmit} />
          </div>
        )
      )}

      <div className="result-section">
        {searched && !user && <p>No user found</p>}
        {user && (
          <div>
            {showInviteResponse && (
              <p style={{ textAlign: 'center' }}>Invite sent ✅</p>
            )}
            <div className="result-card">
              <Link className="profile-icon" to={`/profile/${user._id}`}>
                <FaUser />
              </Link>
              <ButtonFour
                onClick={() => {
                  handleInvite(user._id);
                }}
                buttonName={<FaPlus />}
              />
              {user.username}
            </div>
          </div>
        )}
      </div>
      <div className="member-card-section">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default MemberSection;
