import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Card from '../../Components/CommunityCard'

var styles = require('./styles');

const CommunityScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const postsList = [];

    const [users, setUsers] = useState([]);


    async function getUsers() {

        const usersList = [];

        await firestore().collection('users').get()
            .then(docSnapshot => {
                if (docSnapshot) {
                    docSnapshot.forEach(user => {
                        const { firstName, lastName, imageURL } = user.data()
                        let username = firstName;
                        username += ' ' + lastName;

                        usersList.push(user.data({
                            username: username,
                            userImage: imageURL,
                        }));
                    })

                }

                setUsers(usersList);
            });

    }

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection('community-chat')
                .orderBy("date").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach((documentSnapshot) => {
                            const { messageID, messageText, userID, date, imageURL } = documentSnapshot.data();
                            const user = users.find(user => user.uid === userID)


                            postsList.push({
                                username: user.firstName + " " + user.lastName,
                                userImage: user.imageURL,
                                messageText: messageText,
                                imageURL: imageURL,
                                date: date,
                                messageID: messageID
                            });
                        });
                });



            setPosts(postsList);



        }
        getUsers();
        fetchPosts();

    }, []);

    return (
        <View>
            <View style={styles.header}>
                <Image style={styles.backArrow} source={require(`../../Images/arrowBack.png`)} />
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
                        />
                    )
                })}


            </ScrollView>
        </View>
    );
};

export default CommunityScreen;