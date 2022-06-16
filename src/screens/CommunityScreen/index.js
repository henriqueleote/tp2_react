import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Card from '../../Components/CommunityCard'

var styles = require('./styles');

const CommunityScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const postsList = [];

    const [users, setUsers] = useState([]);


    useEffect(() => {


        const fetchPosts = async () => {
            await firestore().collection('community-chat')
                .orderBy("date","desc").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach((documentSnapshot) => {
                            const { messageID, messageText, userID, date, imageURL, likes, dislikes, verified, video } = documentSnapshot.data();
                            const user = users.find(user => user.uid === userID)

                            // console.log("Name: " + user.firstName)
                            // var name = user.firstName;
                            // name += ' ' + user.lastName;

                            postsList.push({
                                username: "name",
                                // userImage: user.imageURL,
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
            var usersData = [];
            try {
                firestore().collection('users').get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            usersData.push(documentSnapshot.data());
                        });
                        setUsers(usersData);
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

        <View>
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
                            userID = {post.userID}
                        />
                    )
                })}

            </ScrollView>

        </View>
    );
};

export default CommunityScreen;