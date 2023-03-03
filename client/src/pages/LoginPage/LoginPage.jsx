import  './loginpage.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import auth from '../../utils/auth';
import { InputTwo } from '../../components/inputs/Inputs';
import { ButtonOne } from '../../components/buttons/Buttons';


const LoginPage = () => {
    const [loginUser, { data, error }] = useMutation(LOGIN_USER);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const { data } = await loginUser({
            variables: { ...formData },
        });
        console.log(data.loginUser);
        auth.login(data.loginUser.token);
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
            />
            <ButtonOne onClick={handleSubmit} buttonName="Login" />
        </div>
 </div>
    </div>
);
};
export default LoginPage;