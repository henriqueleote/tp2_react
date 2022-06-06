import React, { useState } from 'react';
import Login from './src/screens/Login';
import MainPage from './src/screens/MainPage';

import auth from '@react-native-firebase/auth';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const createUser = (email, password) => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signin = (email, password) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  if (authenticated) {
    return <MainPage />;
  }

  return <Login signin={signin} createUser={createUser} />;
}