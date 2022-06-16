import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MissingPostScreen from './src/screens/MissingPostScreen';
import NewsPostScreen from './src/screens/NewsPostScreen';


const Stack = createStackNavigator();

const MainActivity = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false}}/>
        <Stack.Screen name="MissingPostScreen" component={MissingPostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewsPostScreen" component={NewsPostScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    /*<NavigationContainer>
      <Tabs />
    </NavigationContainer>*/
  );
}

export default MainActivity;