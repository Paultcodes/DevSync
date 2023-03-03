import './settings.css';
import { InputOne } from '../../components/inputs/Inputs';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { TextArea } from '../../components/inputs/Inputs';
import { useState } from 'react';
import { UPDATE_USERNAME } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
const ProfileSettings = () => {
  const [updateUsername, { error }] = useMutation(UPDATE_USERNAME);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  const [formData, setFormData] = useState({
    username: '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = () => {
    try {
      const { data } = updateUsername({
        variables: { ...formData },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="settings-section">
      <div className="settings">
        <div>
          <h3>Username</h3>
          <InputOne
            onChange={handleChange}
            name="username"
            placeholder={userData.username}
          />
        </div>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
