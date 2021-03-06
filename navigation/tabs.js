import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MissingBoardScreen from '../src/screens/MissingBoardScreen';
import Profile from '../src/screens/ProfileScreen';
import News from '../src/screens/NewsScreen';
import Community from '../src/screens/CommunityScreen';
import Map from '../src/screens/MapScreen';



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
            <Tab.Screen name='Map' component={Map} options={{ headerShown: false, tabBarIcon: () => (<Image source={require("../assets/icons/map.png")} style={{ width: 30, height: 30 }} />) }} />
            <Tab.Screen name='News' component={News} options={{ headerShown: false, tabBarIcon: () => (<Image source={require("../assets/icons/news.png")} style={{ width: 30, height: 30 }} />) }} />
            <Tab.Screen name='Community' component={Community} options={{ headerShown: false,  tabBarIcon: () => (<Image source={require("../assets/icons/community.png")} style={{width: 30, height: 30}} />)}} />
            <Tab.Screen name='MissingBoardScreen' component={MissingBoardScreen} options={{ headerShown: false, tabBarIcon: () => (<Image source={require("../assets/icons/missing.png")} style={{ width: 30, height: 30 }} />) }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false, tabBarIcon: () => (<Image source={require("../assets/icons/profile.png")} style={{ width: 30, height: 30 }} />) }} />
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