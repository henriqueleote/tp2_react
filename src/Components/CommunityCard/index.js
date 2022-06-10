import React from 'react';
import { View, Image, Text } from 'react-native';

var styles = require('./styles');

const CommunityCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={require('../../Images/sos.png')} />
                <Text style={styles.userName}>Nome do Utilizador</Text>
            </View>

            <Text style={styles.description}>Descrição</Text>

            <View style={styles.footer}>

                <Text style={styles.date}>Data</Text>
                <Image style={styles.reactionIcons} source={require('../../Images/like.jpg')} />
                <Image style={styles.reactionIcons} source={require('../../Images/dislike.png')} />
            </View>
        </View>
    );
};

export default CommunityCard;