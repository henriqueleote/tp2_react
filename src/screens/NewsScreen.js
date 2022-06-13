import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileScreen from './ProfileScreen';


const NewsScreen = () => {
    
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getNews = async () => {
                var newsData = [];
            try {
                    firestore().collection('news').orderBy("date").get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            newsData.push(documentSnapshot.data());
                            console.log(documentSnapshot.data());
                        });
                        setNews(newsData);
                });
            }
            catch (error) {
                console.log(error);
            }
        };

        const getUsers = async () => {
                var usersData = [];
            try {
                    firestore().collection('users').get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            usersData.push(documentSnapshot.data());
                            console.log(documentSnapshot.data());
                        });
                        setUsers(usersData);
                    });
                getNews();
            }
            catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    return (
        <ScrollView style={{ padding: 20 }}>
            {news.map((single) => {
            return (
                <View key={ single.newsID } style={styles.list}>
                        <Image source={{ uri: single.imageURL }} style={styles.listImage} />
                        <View style={styles.listingRatingContainer}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
                            <Image source={{ uri: single.pubImgURL }} style={styles.pubImage} />
                            <Text style={styles.title}>{single.newsTitle}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Text style={styles.text}>{single.newsText}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Text style={styles.date}>{new Date(single.date.seconds * 1000).toLocaleDateString("pt-PT")}</Text>
                            <Text style={styles.seeMore}>see more</Text>
                        </View>
                        </View>
                        
                </View>
            )
      }) }
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
    backgroundColor: '#F1EFEF',
    width: '100%',
    flexDirection: 'column',
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'black',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,  
    },
    
    listImage: {
      
    width: '100%',
        height: 200,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
  
    title: {
        marginLeft: 10,
        marginTop: 18,
        fontWeight: '500',
        fontSize: 17, 
        color: '#333333'
    },

    text: {

    },

    date: {
        alignSelf: 'flex-start',
        fontSize: 12, 
        color: '#333333'
    },

    seeMore: {
        position: 'absolute',
        right: 0,
        fontSize: 12, 
        color: '#333333'
    },

    pubImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 10,
        marginTop: 10
    }
});

export default NewsScreen;