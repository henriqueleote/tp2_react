import React from 'react';
import { View, Text,ScrollView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';

import NewMessage from '../Components/NewMessage'

const NewMessageComunity = ({ navigation }) => {
    return (
        <ScrollView>
            <NewMessage/>
        </ScrollView>
        
    );
};

export default NewMessageComunity;