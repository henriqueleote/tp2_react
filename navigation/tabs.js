import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../src/screens/HomeScreen';
import Profile from '../src/screens/ProfileScreen';
import News from '../src/screens/NewsScreen';
import Community from '../src/screens/CommunityScreen';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroudColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => (<Image source={require("../assets/icons/map.png")} style={{ width: 30, height: 30 }} />) }} />
            <Tab.Screen name='News' component={News} options={{tabBarIcon: () => (<Image source={require("../assets/icons/news.png")} style={{width: 30, height: 30}} />)}} />
            <Tab.Screen name='Community' component={Community} options={{tabBarIcon: () => (<Image source={require("../assets/icons/community.png")} style={{width: 30, height: 30}} />)}} />
            <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon: () => (<Image source={require("../assets/icons/profile.png")} style={{width: 30, height: 30}} />)}} />
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;