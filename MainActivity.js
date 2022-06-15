import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from './src/screens/PostScreen';

const Stack = createStackNavigator();

const MainActivity = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false}}/>
        <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    /*<NavigationContainer>
      <Tabs />
    </NavigationContainer>*/
  );
}

export default MainActivity;