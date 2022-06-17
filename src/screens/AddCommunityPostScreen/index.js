import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button } from 'react-native'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles'

const AddCommunityPostScreen = ({ navigation }) => {

    const [user, setUser] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
                    setUser(documentSnapshot.data());
                })
            }
            catch (error) {
                console.log(error);
            }
        }

        getUser();
    })

    function submit() {
        console.log(message)
        console.log(user.firstName)

        var ref = firestore().collection('community-chat').doc();

        ref.set({
            date: new Date(),
            dislikes: 0,
            likes: 0,
            imageURL: "", // TODO: create image input in component
            messageID: ref.id,
            messageText: message,
            userID: user.uid,
            verified: false,
            video: false // para react n foi implementado
        })

        navigation.goBack()
    }

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.goBack()}>
                    <Image style={styles.arrowBack} source={require('../../Images/arrowBack.png')} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Add Post</Text>
            </View>

            <View style={styles.container}>
                <TextInput placeholder="Enter your message"
                    style={styles.textInput}
                    onChangeText={(text) => setMessage(text)} />

                <Button title="Create" onPress={() => submit()} />
            </View>

        </View>

    )
}

export default AddCommunityPostScreen;