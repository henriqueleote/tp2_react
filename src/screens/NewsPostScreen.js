import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground, Share} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const NewsPostScreen = ({ route }) => {
    const [pubImgURL, setPubImgURL] = useState("");
    const [newsTitle, setNewsTitle] = useState("");
    const [date, setDate] = useState("");
    const [newsText, setNewsText] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [pubID, setPubID] = useState([]);
    const [username, setUsername] = useState("");


    useEffect(() => {
        const { newsID } = route.params;
        const fetchPosts = async () => {
            await firestore().collection('news')
                .where("newsID","==",newsID).get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach(async(documentSnapshot) => {
                            const { pubID, pubImgURL, newsTitle, newsText, imageURL, date } = documentSnapshot.data();

                            setPubID(pubID);
                            setPubImgURL(pubImgURL);
                            setNewsTitle(newsTitle);
                            setNewsText(newsText);
                            setImageURL(imageURL);
                            setDate(date);
                                                        
                            await firestore().collection('users').where('uid', '==', pubID).get()
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

                        });
                });

        }

        fetchPosts();

    }, []);

    const navigation = useNavigation();

    const share = async  () =>{
        
        const result = await Share.share({
          message:
            newsText});
        
    };
    return (
        
        <ScrollView>
            <View style={styles.header}>
                <ImageBackground source={{ uri: imageURL }} resizeMode="cover" style={styles.imageIRL}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={styles.backArrow} source={require('../Images/arrowBack.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{share()} }>
                    <Image style={styles.share} resizeMode="cover" source={require('../Images/share_blue.png')} />
                </TouchableOpacity>    
                </ImageBackground>
            </View>

            <View style={styles.details}>
                <Text style={styles.title}>{newsTitle}</Text>
                <View style={styles.date}>
                    <Image style={styles.calendar} source={require('../Images/calendar.jpg')}></Image>
                    <Text>{new Date(date.seconds * 1000).toLocaleDateString("pt-PT")}</Text>
                </View>
                <Text style={styles.text}>{newsText}</Text>
                <View style={styles.user}>
                    <Image style={styles.pubImage} source={{ uri: pubImgURL }}></Image>
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
        top: 160,
        left: 310,
    },

    backArrow: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        top: 20,
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