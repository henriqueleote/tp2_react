import React from 'react';
import { View, Image, Text } from 'react-native';

var styles = require('./styles');

const CommunityCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={require(`../../Images/sos.png`)} />
                <Text style={styles.userName}>Nome do Utilizador</Text>
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