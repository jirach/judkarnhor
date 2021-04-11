/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { createBrowserHistory } from 'history';
import firebaseConfig from '../Firebase/firebaseIndex';
import UserService from '../Services/UserServices';
import customHistory from '../Services/BrowserHistory';

export const FirebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);

  const handleSignin = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((res) => {
      setUser(UserService.transformFirebaseUser(res.user));
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
    <FirebaseAuth.Provider value={{
      handleSignin, handleSignout, user, setUser, errors,
    }}
    >
      {props.children}
    </FirebaseAuth.Provider>
  );
};

export default AuthProvider;
