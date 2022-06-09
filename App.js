import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';

import Login from './src/screens/Login';
//import MainPage from './src/screens/MainPage';
import MainActivity from './MainActivity'
import auth from '@react-native-firebase/auth';


/*export default function App() {
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
}*/

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (authenticated) {
    return <MainActivity />;
  }

  return <Login />;
}

export default App;