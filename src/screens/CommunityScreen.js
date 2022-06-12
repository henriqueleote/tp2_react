import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Card from '../Components/CommunityCard'


const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);

    const postsList = [];

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection('community-chat')
                .orderBy("date").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach(documentSnapshot => {
                            const { messageID, messageText, userID, date, imageURL } = documentSnapshot.data();

                            const userData = {};

                            console.log("UserID ->>>>>> "+userID)

                            firestore().collection('users').where("uid" == userID).get()
                                .then(docSnapshot => {
                                    if (docSnapshot.exists) {
                                        userData = docSnapshot.data()
                                        console.log(userData)
                                    }
                                });


                            postsList.push(documentSnapshot.data({
                                userID: userID,
                                messageText: messageText,
                                imageURL: imageURL,
                                date: date
                            }));
                        });
                });

            setPosts(postsList);


        }

        fetchPosts();

    }, []);

    return (
        //Card
        <ScrollView>
            {posts.map((post) => {
                return (
                    <Card                        
                        image={post.imageURL}
                        message={post.messageText}
                        date={post.date}
                    />
                )
            })}


        </ScrollView>
    );
};

export default HomeScreen;