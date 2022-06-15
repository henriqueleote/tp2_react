import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import MissingPost from '../Components/MissingPost'
import { ScrollView } from 'react-native-gesture-handler';

var styles = require('./CommunityScreen/styles');

const Post = ({ route }) => {

    const [userID, setUserID] = useState([]);
    const [fotoMissing, setFotoMissing] = useState("");
    const [missingName, setMissingName] = useState("");
    const [missingAge, setMissingAge] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [userFoto, setUserFoto] = useState("");

    useEffect(() => {
        const { missingID } = route.params;
        const fetchPosts = async () => {
            await firestore().collection('missing-board')
                .where("missingID","==",missingID).get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach(async(documentSnapshot) => {
                            const { userID, fotoMissing, missingName, missingAge, description, phoneNumber } = documentSnapshot.data();

                            setUserID(userID);
                            setFotoMissing(fotoMissing);
                            setMissingName(missingName);
                            setMissingAge(missingAge);
                            setDescription(description);
                            
                            setPhoneNumber(phoneNumber);
                            
                            await firestore().collection('users').where('uid', '==', userID).get()
                                .then(docSnapshot => {
                                    if (docSnapshot) {
                                        docSnapshot.forEach(user => {
                                            const { firstName, lastName, imageURL } = user.data()
                                            let username = firstName;
                                            username += ' ' + lastName;

                                            setUsername(username);
                                            setUserFoto(imageURL);

                                        })

                                    }
                                });

                        });
                });

        }

        fetchPosts();

    }, []);

        const navigation = useNavigation();


    return (
        
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image style={styles.backArrow} source={require('../Images/arrowBack.png')} />
                </TouchableOpacity>
            </View>
            <MissingPost 
                userID = {userID}
                fotoMissing = {fotoMissing}
                missingName = {missingName}
                missingAge = {missingAge}
                description = {description}
                phoneNumber = {phoneNumber}
                username = {username}
                userFoto={userFoto}
            />
        </ScrollView>
    );

};

export default Post;