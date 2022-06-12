import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Card from '../Components/CommunityCard'


const CommunityScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([]);

    const postsList = [];

    const [username, setUsername] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection('community-chat')
                .orderBy("date").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach( async(documentSnapshot) => {
                            const { messageText, userID, date, imageURL } = documentSnapshot.data();



                            await firestore().collection('users').where('uid', '==', userID).get()
                                .then(docSnapshot => {
                                    if (docSnapshot) {
                                        docSnapshot.forEach(user => {
                                            const { firstName, lastName, imageURL } = user.data()

                                            const usernameAux = firstName + ' ' + lastName;

                                            console.log("NAmeAux: " + usernameAux)

                                            setUsername(usernameAux);
                                            setUserImage(imageURL);
                                            console.log("NAme: " + username)



                                        })

                                    }
                                });




                            postsList.push(documentSnapshot.data({
                                username: username,
                                userImage: userImage,
                                messageText: messageText,
                                imageURL: imageURL,
                                date: date
                            }));
                        });
                });

            setPosts(postsList);

            console.log("Size->>>>>>> " + postsList.length)


        }

        fetchPosts();

    }, []);

    return (
        //Card
        <ScrollView>
            {posts.map((post) => {
                return (
                    <Card
                        username={post.username}
                        userImage={post.userImage}
                        image={post.imageURL}
                        message={post.messageText}
                        date={post.date}
                    />
                )
            })}


        </ScrollView>
    );
};

export default CommunityScreen;