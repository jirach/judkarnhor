/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../Firebase/firebaseIndex';
import UserService from '../Services/UserServices';
import customHistory from '../Services/BrowserHistory';

export const AppContext = React.createContext();

const AppProvider = (props) => {
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('Jud Karn Hor');

  const handleSignin = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then(async (res) => {
      // Successfully authen with firebase
      const loggedInUser = UserService.transformFirebaseUser(res.user);
      setUser(loggedInUser);
      customHistory.push('/');
    }).catch((error) => {
      setErrors((prev) => ([...prev, error.message]));
    });
  };

  const handleSignout = () => {
    firebase.auth().signOut().then((res) => {
      setUser(null);
    })
      .catch((err) => {
        setErrors((prev) => ([...prev, err.message]));
      });
  };

  return (
    <AppContext.Provider value={{
      handleSignin, handleSignout, user, setUser, errors, title, setTitle,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
