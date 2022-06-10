import React from 'react';
import { View } from 'react-native';

import Card from '../Components/CommunityCard'

const HomeScreen = ({ navigation }) => {
    return (

        //Card
        <View>
            <Card />
            <Card />

        </View>
    );
};

export default HomeScreen;