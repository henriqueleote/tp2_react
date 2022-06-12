import React from 'react';
import { View, Image, Text } from 'react-native';

var styles = require('./styles');

const CommunityCard = (props) => {
    console.log('Community: ' + props.username)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={{uri: props.userImage}} />
                <Text style={styles.userName}>{props.username}</Text>
            </View>

            <Text style={styles.description}>{props.message}</Text>
            <Image style={styles.postImage} source={{ uri: props.image}}/>
            <View style={styles.footer}>

                <Text style={styles.date}>Date</Text>
                <View style={styles.reactionContainer}>
                    <Image style={styles.reactionIcons} source={require(`../../Images/like.jpg`)} />
                    <Image style={styles.reactionIcons} source={require('../../Images/dislike.png')} />
                </View>
            </View>
        </View>
    );
};

export default CommunityCard;