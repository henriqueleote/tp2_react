import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Card from '../../Components/CommunityCard'

var styles = require('./styles');

const CommunityScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const postsList = [];
    var usersData = [];



    useEffect(() => {


        const fetchPosts = async () => {
            await firestore().collection('community-chat')
                .orderBy("date", "desc").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach((documentSnapshot) => {
                            const { messageID, messageText, userID, date, imageURL, likes, dislikes, verified, video } = documentSnapshot.data();
                            const user = usersData.find(user => user.uid === userID)

                            postsList.push({
                                username: user.firstName + ' ' + user.lastName,
                                userImage: user.imageURL,
                                messageText: messageText,
                                imageURL: imageURL,
                                date: date,
                                messageID: messageID,
                                likes: likes,
                                dislikes: dislikes,
                                verified: verified,
                                video: video,
                                userID: userID,
                            });
                        });
                });

            setPosts(postsList);
        }


        const getUsers = async () => {

            try {
                firestore().collection('users').get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            usersData.push(documentSnapshot.data());
                        });
                    });
                fetchPosts();
            }
            catch (error) {
                console.log(error);
            }
        };

        getUsers();

    }, []);





    return (

        <View >
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Community</Text>
            </View>
            {/* Card */}
            <ScrollView>
                {posts.map((post) => {
                    return (
                        <Card
                            key={post.messageID}
                            username={post.username}
                            userImage={post.userImage}
                            imageURL={(post.imageURL == "") ? undefined : post.imageURL}
                            messageText={post.messageText}
                            date={post.date}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            messageID={post.messageID}
                            verified={post.verified}
                            video={post.video}
                            userID={post.userID}
                        />
                    )
                })}
                <View style={styles.extraSpace} />

            </ScrollView>

        </View>
    );
};

export default CommunityScreen;