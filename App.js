import React, { useState } from 'react';

import Login from './src/screens/Login';
import MainActivity from './MainActivity'
import auth from '@react-native-firebase/auth';


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