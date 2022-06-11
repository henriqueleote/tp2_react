import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

var styles = require('./styles');

const NewMessage = () => {
    return (
    // <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.arrowBack} source={require('../../Images/arrowBack.png')} />
                <Text style={styles.title}>New Post</Text>
            </View>

            
                <View style={styles.cardContainer}>
                    <View style={styles.headerCard}>
                        <Image style={styles.profileImage} source={require('../../Images/profileIcon.png')} />
                        <Text style={styles.profileName}>David Belchior</Text>
                    </View>

                    <View style={styles.allInfoAboutMissing}>
                        <Image style={styles.missingImage} source={require('../../Images/child.jpg')} />
                        <View style={styles.infoTextMissing}>
                            <Text style={styles.missingName}>Francisca Xavier</Text>
                            <Text style={styles.missingAge}>Age: 8</Text>
                            <Text style={styles.missingDescription}>Lorem fdsafjjkfhudfhguifghuidffdsfsdfsdfsdfsdfsdfsdfghuodfpAAAAAAAA</Text>
                        </View>
                    </View>
                    <View style={styles.comunication}>
                        <Image style={styles.arrowBack} source={require('../../Images/phone.png')} />
                        <Image style={styles.arrowBack} source={require('../../Images/share.png')} />
                    </View>
                </View>
            
        </View>
// </ScrollView>

    );
};

export default NewMessage;