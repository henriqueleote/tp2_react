import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

var styles = require('./styles');

const MissingPost = (props) => {
    return (

        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator style={styles.scrollView}>
                {/* <View style={styles.header}>
                    <Image style={styles.arrowBack} source={require('../../Images/arrowBack.png')} />
                    <Text style={styles.title}>New Post</Text>
                </View> */}


                <View style={styles.cardContainer}>

                    <View style={styles.headerCard}>
                        <Image style={styles.profileImage} source={{uri: props.userFoto}} />
                        <Text style={styles.profileName}>{props.username}</Text>
                    </View>
                    <Image style={styles.missingImage} source={{uri: props.fotoMissing}} />
                    <View style={styles.infoTextMissing}>
                        <Text style={styles.text}>{props.missingName}</Text>
                        <Text style={styles.text}>{props.missingAge}</Text>
                        <Text style={styles.text}>{props.description}</Text>
                    </View>

                    <View style={styles.comunication}>
                        <Image style={styles.phoneIcon} source={require('../../Images/phone.png')} />
                        <Image style={styles.shareIcon} source={require('../../Images/share.png')} />
                    </View>

                </View>
            </ScrollView>
        </View>


    );
};

export default MissingPost;