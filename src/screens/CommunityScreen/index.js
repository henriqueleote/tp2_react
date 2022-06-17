import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, RefreshControl } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Card from '../../Components/CommunityCard'

var styles = require('./styles');

const CommunityScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);

    var usersData = [];
    const [user, setUser] = useState([]);
    const [refreshing, setRefreshing] = useState(false)


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
    const fetchPosts = async () => {
        const postsList = [];
        await firestore().collection('community-chat')
            .orderBy("date", "desc").get()
            .then(collectionSnapshot => {
                collectionSnapshot
                    .forEach((documentSnapshot) => {
                        const { messageID, messageText, userID, date, imageURL, likes, dislikes, verified, video } = documentSnapshot.data();
                        const userAux = usersData.find(user => user.uid === userID)

                        postsList.push({
                            username: userAux.firstName + ' ' + userAux.lastName,
                            userImage: userAux.imageURL,
                            messageText: messageText,
                            imageURL: imageURL,
                            date: date,
                            messageID: messageID,
                            likes: likes,
                            dislikes: dislikes,
                            verified: verified,
                            video: video,
                            userID: userID,
                            userType: user.userType
                        });
                    });
            });

        setPosts(postsList);
    }


    useEffect(() => {
        const getUser = async () => {
            try {
                await firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
                    setUser(documentSnapshot.data());
                })
            }
            catch (error) {
                console.log(error);
            }
        };
        getUser();
        getUsers();

    }, []);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUsers();
        wait(1000).then(() => setRefreshing(false));
    }, []);
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Community</Text>
            </View>
            {/* Card */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
                            userType={post.userType}
                        />
                    )
                })}
                <View style={styles.extraSpace} />

            </ScrollView>
            {user.userType == 'admin' ?
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('AddCommunityPostScreen')}>
                    <Image style={styles.floatButton}
                        source={require(`../../Images/floatButton.png`)}
                    />
                </TouchableOpacity> : null
            }


        </View>
    );
};

export default CommunityScreen;