import { useMutation } from "@apollo/client";
import { useState } from "react";

import "./signup.css";

import { SIGNUP_USER } from "../../utils/mutations";
import { InputTwo } from "../../components/inputs/Inputs";
import { ButtonOne } from "../../components/buttons/Buttons";

import auth from "../../utils/auth";

const SignupPage = () => {
  const [createUser] = useMutation(SIGNUP_USER);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formData }
      });
      auth.login(data.createUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="signup-form">
      <h1>Sign Up!</h1>
      <div className="signup-inputs">
        {[
          ["firstName", "First name"],
          ["lastName", "Last name"],
          ["username", "Username"],
          ["email", "Email"],
          ["password", "password"]
        ].map(([name, ph]) => (
          <InputTwo
            onChange={handleChange}
            name={name}
            placeholder={ph}
            type={name === "password" ? name : "text"}
          />
        ))}
        ;
        <ButtonOne onClick={handleSubmit} buttonName="Submit" />
      </div>
    </div>
  );
};

export default SignupPage;
