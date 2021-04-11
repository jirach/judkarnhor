/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import firebaseConfig from '../Firebase/firebaseIndex';

export const firebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => firebase.auth().onAuthStateChanged((loggedInUser) => {
    setUser(loggedInUser);
  }));

  const handleSignin = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider).then((res) => {
      setUser(res.user);
      history.push('/');
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
    <firebaseAuth.Provider value={{
      handleSignin, handleSignout, user, errors,
    }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
