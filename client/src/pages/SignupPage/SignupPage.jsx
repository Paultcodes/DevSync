import { useMutation } from '@apollo/client';
import { useState } from 'react';

import './signup.css';

import { SIGNUP_USER } from '../../utils/mutations';
import { InputOne, InputTwo, InputThree } from '../../components/inputs/Inputs';
import { ButtonOne } from '../../components/buttons/Buttons';

import auth from '../../utils/auth';

const SignupPage = () => {
  const [createUser, { data, error }] = useMutation(SIGNUP_USER);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);


    try {
      const { data } = await createUser({
        variables: { ...formData },
      });
      console.log(data.createUser);
      auth.login(data.createUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };
  return (
    <div className="signup-form">
      <h1>Sign Up!</h1>
      <div className="signup-inputs">
      <InputTwo
          onChange={handleChange}
          name="firstName"
          placeholder="First name"
        />
         <InputTwo
          onChange={handleChange}
          name="lastName"
          placeholder="Last name"
        />
        <InputTwo
          onChange={handleChange}
          name="username"
          placeholder="Username"
        />
        <InputTwo onChange={handleChange} name="email" placeholder="Email" />
        <InputTwo
        type='password'
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <ButtonOne onClick={handleSubmit} buttonName="Submit" />
      </div>
    </div>
  );
};

export default SignupPage;
