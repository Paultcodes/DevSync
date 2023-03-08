import { useState } from 'react';
import { InputOne, InputTwo } from '../../components/inputs/Inputs';
import { ButtonOne } from '../../components/buttons/Buttons';
import HomeCard from '../../components/HomeCards/HomeCard';
import { Link } from 'react-router-dom';
import './creategroup.css';

import auth from '../../utils/auth';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_GROUP } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
import { GET_ME } from '../../utils/queries';

const CreateGroupPage = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [createGroup, { data: createData, error }] = useMutation(CREATE_GROUP);
  const [groupType, setGroupType] = useState('open');
  const userData = data?.me.ownedGroups || [];
  console.log(userData);

  const [groupForm, setGroupForm] = useState({
    groupName: '',
    type: 'open',
  });

  const handleRadioChange = (event) => {
    setGroupType(event.target.value);

    setGroupForm((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleChange = (e) => {
    setGroupForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await createGroup({
        variables: { ...groupForm },
      });
      if (data) {
        refetch()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="create-form">
      <h1>Create Your Group</h1>
      <div>
        <div>
          <label>
            <input
              type="radio"
              name="groupType"
              value="open"
              checked={groupType === 'open'}
              onChange={handleRadioChange}
            />
            Open Group
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="groupType"
              value="private"
              checked={groupType === 'private'}
              onChange={handleRadioChange}
            />
            Private Group
          </label>
        </div>
      </div>
      <div className="create-group-input">
        <h2>{}</h2>
        <InputTwo
          name="groupName"
          onChange={handleChange}
          placeholder="Group name"
        />
        <ButtonOne buttonName="Submit" onClick={handleSubmit} />
      </div>
      <div className="card-section">
        {userData ? (
          userData.map((group) => {
            return <Link to={`/group/${group._id}`}>{group.groupName}</Link>;
          })
        ) : (
          <>Create a group</>
        )}
      </div>
    </form>
  );
};

export default CreateGroupPage;
