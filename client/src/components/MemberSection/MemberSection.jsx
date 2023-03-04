import UserCard from '../UserCards/UseCard';
import {
  ButtonOne,
  ButtonTwo,
  ButtonThree,
  ButtonFour,
} from '../buttons/Buttons';
import './membersection.css';
import { useState } from 'react';
import { InputOne } from '../inputs/Inputs';
import { Link } from 'react-router-dom';
import { SEARCH_USER } from '../../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { FaSearch, FaPencilAlt, FaUser, FaPlus } from 'react-icons/fa';

const MemberSection = () => {
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
    console.log(searchTerm);
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
        <ButtonOne buttonName={<FaPencilAlt />}>
          {' '}
          Post A Help Wanted Ad
        </ButtonOne>
        <ButtonOne buttonName={<FaPlus />}> Invite A User</ButtonOne>
      </div>
      <div className="search-user">
        <InputOne onChange={handleSearch} placeholder="Username" />
        <ButtonOne onClick={searchForUser}>
          <FaSearch />
        </ButtonOne>
      </div>
      <div className="result-section">
        {searched && !user && <p>No user found</p>}
        {user && (
          <div className='result-card'>
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
