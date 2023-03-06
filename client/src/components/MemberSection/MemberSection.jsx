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
import { CREATE_HELP_WANTED } from '../../utils/mutations';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { FaSearch, FaPencilAlt, FaUser, FaPlus } from 'react-icons/fa';
import auth from '../../utils/auth';

const MemberSection = () => {
  const { groupId } = useParams();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(helpWantedForm)
    console.log(groupId)

    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false
    }

    try {
      const {data} = await createHelpWanted({
        variables: {...helpWantedForm, groupId}
      })
    } catch (err) {
      console.log(err)
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
      {renderForm === 'invite' ? (
        <div className="search-user">
          <InputOne onChange={handleSearch} placeholder="Username" />
          <ButtonOne onClick={searchForUser}>
            <FaSearch />
          </ButtonOne>
        </div>
      ) : (
        renderForm === 'help' && (
          <div className="help-wanted">
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
          <div className="result-card">
            <Link className="profile-icon" to={`/profile/${user._id}`}>
              <FaUser />
            </Link>
            <ButtonFour buttonName={<FaPlus />} />
            {user.username}
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
