import './loginpage.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import auth from '../../utils/auth';
import { InputTwo } from '../../components/inputs/Inputs';
import { ButtonOne } from '../../components/buttons/Buttons';

const LoginPage = () => {
  const [login, { data, error }] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formData },
      });
      auth.login(data.login.token);
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="login">
      <div className="login-form">
        <h1>Login!</h1>
        <div className="login-inputs">
          <InputTwo
            onChange={handleChange}
            name="username"
            placeholder="Username"
          />

          <InputTwo
            onChange={handleChange}
            name="password"
            placeholder="Password"
            type='password'
          />
          <div style={{textAlign: 'center'}}>{errorMessage}</div>
          <ButtonOne onClick={handleSubmit} buttonName="Login" />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
