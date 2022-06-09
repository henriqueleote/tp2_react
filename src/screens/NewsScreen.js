import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const getNews = async () => {
                var data = [];
            try {
                    firestore().collection('news').orderBy("date").get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            data.push(documentSnapshot.data());
                        });
                        setNews(data);
                });
            }
            catch (error) {
                console.log(error);
            }
        };

        getNews();
    }, []);

    return (
        <ScrollView style={{padding:20}}>
            {news.map((single) => {
            return (
                    <View style={styles.list}>
                        <Image source={{ uri: single.imageURL }} style={styles.listImage} />
                        <View style={styles.listingRatingContainer}>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: single.pubImgURL }} style={styles.pubImage} />
                        </View>
                        <Text style={styles.title}>{single.newsTitle}</Text>
                        <Text style={styles.title}>{single.date.toLocaleString()}</Text>
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
        fontWeight: '500',
        fontSize: 17, 
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