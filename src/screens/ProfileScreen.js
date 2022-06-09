import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginScreen from './Login';

async function logout() {
    await auth().signOut()
    .then(() => {
        console.log('logged out');
        return <LoginScreen />;
        })
        .catch(error => console.log(error));
}

function getUserID() {
    auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid);
        }
    });
}

const ProfileScreen = ({ navigation }) => {
    getUserID();
    return (
        <View>
            
            <Text>Profile Screen</Text>
            <Button title='Logout' onPress={() => logout()}></Button>
        </View>
    );
};

export default ProfileScreen;