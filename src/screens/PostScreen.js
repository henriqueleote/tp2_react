import React, {useEffect, useState} from 'react';
import { View, PlatformColor, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import MissingPost from '../Components/MissingPost'

const Post = ({ navigation }) => {

    const [userID, setUserID] = useState([]);
    const [fotoMissing, setFotoMissing] = useState("");
    const [missingName, setMissingName] = useState("");
    const [missingAge, setMissingAge] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [userFoto, setUserFoto] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            await firestore().collection('missing-board')
                .where("missingID","==","fUWUP0IWorlRmonhaFtA").get()
                .then(collectionSnapshot => {
                    collectionSnapshot
                        .forEach(async(documentSnapshot) => {
                            const { userID, fotoMissing, missingName, missingAge, description, phoneNumber } = documentSnapshot.data();

                            setUserID(userID);
                            setFotoMissing(fotoMissing);
                            setMissingName(missingName);
                            setMissingAge(missingAge);
                            setDescription(description);
                            if(PlatformColor.OS === 'android'){
                                setPhoneNumber('tel:${' + phoneNumber+ '}');
                            }else{
                                setPhoneNumber('telprompt:${' + phoneNumber + '}');
                            }
                            
                        
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


    return (
        <View>
            <MissingPost 
                userID = {userID}
                fotoMissing = {fotoMissing}
                missingName = {missingName}
                missingAge = {missingAge}
                description = {description}
                phoneNumber = {phoneNumber}
                username = {username}
                userFoto = {userFoto}
            />
        </View>
    );

};

export default Post;