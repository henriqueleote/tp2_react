import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MissingPostScreen from './src/screens/MissingPostScreen';
import NewsPostScreen from './src/screens/NewsPostScreen';
import AddCommunityPostScreen from './src/screens/AddCommunityPostScreen';
import ProfileEdit from './src/screens/ProfileEdit';


const Stack = createStackNavigator();

const MainActivity = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false}}/>
        <Stack.Screen name="MissingPostScreen" component={MissingPostScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewsPostScreen" component={NewsPostScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="AddCommunityPostScreen" component={AddCommunityPostScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    /*<NavigationContainer>
      <Tabs />
    </NavigationContainer>*/
  );
}

export default MainActivity;