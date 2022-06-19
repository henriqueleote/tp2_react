import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground, Share} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const NewsPostScreen = ({ route }) => {
    const { postData } = route.params;

    const [username, setUsername] = useState("");


    useEffect(() => {
        const fetchUser = async () => {
            await firestore().collection('users').where('uid', '==', postData.pubID).get()
                                .then(docSnapshot => {
                                    if (docSnapshot) {
                                        docSnapshot.forEach(user => {
                                            const { firstName, lastName } = user.data()
                                            let username = firstName;
                                            username += ' ' + lastName;

                                            setUsername(username);

                                        })

                                    }
                                });

        }

        fetchUser();

    }, []);

    const navigation = useNavigation();

    const share = async  () =>{
        
        const result = await Share.share({
          message: postData.newsText
        });
        
    };
    return (
        
        <ScrollView>
            <View style={styles.header}>
                <ImageBackground source={{ uri: postData.imageURL }} resizeMode="cover" style={styles.imageIRL}>
                <TouchableOpacity onPress={()=>{share()} }>
                    <Image style={styles.share} resizeMode="cover" source={require('../Images/share_blue.png')} />
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={styles.arrowContainer}><Image style={styles.backArrow} source={require('../Images/arrowBack.png')} /></View>
                </TouchableOpacity>  
                </ImageBackground>
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{postData.newsTitle}</Text>
                <View style={styles.date}>
                    <Image style={styles.calendar} source={require('../Images/calendar.jpg')}></Image>
                    <Text>{new Date(postData.date.seconds * 1000).toLocaleDateString("pt-PT")}</Text>
                </View>
                <Text style={styles.text}>{postData.newsText}</Text>
                <View style={styles.user}>
                    <Image style={styles.pubImage} source={{ uri: postData.pubImgURL }}></Image>
                    <Text>{username}</Text>
                </View>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({

    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000000',
        lineHeight: 40,
        width: 320,
    },
    calendar:{
        width: 23,
        height: 23,
    },
    date:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        fontSize: 12,
        marginTop: 10
    },
    details: {
        marginLeft: 45,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        marginTop: 10
    },
    pubImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 20
    },

    share: {
        width: 64,
        height: 64,
        top: 185,
        left: 310,
    },
    backArrow: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        left: 3
    },
    arrowContainer: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: 30,
        height: 30,
        top: -40,
        marginRight: 50,
        marginLeft: 20,
        padding:20
    },
    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'black',        
    },

    imageIRL:{
        position: 'relative',
        width: '100%',
        zIndex: 1,
        height: 220,
    },
    user:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },

});

export default NewsPostScreen;