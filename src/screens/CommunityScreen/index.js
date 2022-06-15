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
                .orderBy("date").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach((documentSnapshot) => {
                            const { messageID, messageText, userID, date, imageURL, likes, dislikes } = documentSnapshot.data();
                            const user = users.find(user => user.uid === userID)

                            // console.log("Name: " + user.firstName)
                            // var name = user.firstName;
                            // name += ' ' + user.lastName;

                            postsList.push({
                                username: "name",
                                // userImage: user.imageURL,
                                messageText: messageText,
                                imageURL: imageURL,
                                date: new Date(date.seconds * 1000).toLocaleDateString("pt-PT"),
                                messageID: messageID,
                                likes: likes,
                                dislikes: dislikes
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
                {/* <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={styles.backArrow} source={require(`../../Images/arrowBack.png`)} />
                </TouchableOpacity> */}
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
                            image={post.imageURL}
                            message={post.messageText}
                            date={post.date}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            messageID={post.messageID}
                        />
                    )
                })}

            </ScrollView>

        </View>
    );
};

export default CommunityScreen;