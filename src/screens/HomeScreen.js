import React from 'react';
import { View, Text } from 'react-native';

import MissingPost from '../Components/MissingPost'

const Post = ({ navigation }) => {
    return (
        <View>
            <MissingPost/>
        </View>
    );
};

export default Post;