/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import authMethods from '../Firebase/authMethods';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);

  const handleSignup = () => {
    console.log('handleSignup');
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
    console.log(errors);
  };

  const handleSignin = () => {
    console.log('handleSignin!!!!');
    authMethods.signin(inputs.email, inputs.password, setErrors, setToken);
    console.log(errors, token);
  };

  const handleSignout = () => {
    authMethods.signout();
  };

  return (
    <firebaseAuth.Provider value={{
      handleSignup, handleSignin, handleSignout, inputs, setInputs, errors,
    }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
