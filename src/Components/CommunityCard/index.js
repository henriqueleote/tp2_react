import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';

import Dialog from 'react-native-dialog';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



var styles = require('./styles');

const CommunityCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [reactionData, setReactionData] = useState({})
    const [verified, setVerified] = useState(false)

    const [visible, setVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("")

    const [user, setUser] = useState([]);

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

        setVerified(props.verified)

        getUser();
    })




    function incrementLikes() {
        firestore().collection('community-chat').doc(props.messageID)
            .set({
                date: props.date,
                dislikes: dislikes,
                likes: likes + 1,
                imageURL: (props.imageURL) ? props.imageURL : "",
                messageID: props.messageID,
                messageText: props.messageText,
                userID: props.userID,
                verified: props.verified,
                video: props.video,
            })

        setLikes(likes + 1);
        setIsLiked(true)
    }

    function incrementDislikes() {
        firestore().collection('community-chat').doc(props.messageID)
            .set({
                date: props.date,
                dislikes: dislikes + 1,
                likes: likes,
                imageURL: (props.imageURL) ? props.imageURL : "",
                messageID: props.messageID,
                messageText: props.messageText,
                userID: props.userID,
                verified: props.verified,
                video: props.video,
            })

        setDislikes(dislikes + 1);
        setIsDisliked(true)

    }

    function decrementLikes() {
        firestore().collection('community-chat').doc(props.messageID)
            .set({
                date: props.date,
                dislikes: dislikes,
                likes: likes - 1,
                imageURL: (props.imageURL) ? props.imageURL : "",
                messageID: props.messageID,
                messageText: props.messageText,
                userID: props.userID,
                verified: props.verified,
                video: props.video,
            })

        setIsLiked(false)
        setLikes(likes - 1)
    }

    function decrementDislikes() {
        firestore().collection('community-chat').doc(props.messageID)
            .set({
                date: props.date,
                dislikes: dislikes - 1,
                likes: likes,
                imageURL: (props.imageURL) ? props.imageURL : "",
                messageID: props.messageID,
                messageText: props.messageText,
                userID: props.userID,
                verified: props.verified,
                video: props.video,
            })

        setIsDisliked(false)
        setDislikes(dislikes - 1)
    }

    function switchToLike(isToLike) {
        if (isToLike) {
            firestore().collection('community-chat').doc(props.messageID)
                .set({
                    date: props.date,
                    dislikes: dislikes - 1,
                    likes: likes + 1,
                    imageURL: (props.imageURL) ? props.imageURL : "",
                    messageID: props.messageID,
                    messageText: props.messageText,
                    userID: props.userID,
                    verified: props.verified,
                    video: props.video,
                })

            setIsLiked(true)
            setLikes(likes + 1)
            setIsDisliked(false)
            setDislikes(dislikes - 1)
        } else {
            firestore().collection('community-chat').doc(props.messageID)
                .set({
                    date: props.date,
                    dislikes: dislikes + 1,
                    likes: likes - 1,
                    imageURL: (props.imageURL) ? props.imageURL : "",
                    messageID: props.messageID,
                    messageText: props.messageText,
                    userID: props.userID,
                    verified: props.verified,
                    video: props.video,
                })

            setIsDisliked(true)
            setDislikes(dislikes + 1)
            setIsLiked(false)
            setLikes(likes - 1)
        }

    }

    function doLike() {
        if (!isLiked) {

            if (isDisliked) {
                //Dar update da firebase da reação para like
                switchToLike(true)
            } else
                incrementLikes()
        } else {
            decrementLikes()
        }
    }

    async function doDislike() {
        if (!isDisliked) {
            if (isLiked) {
                //Dar update da firebase da reação para like
                switchToLike(false)
            } else
                incrementDislikes()
        } else {
            decrementDislikes();
        }
    }

    function switchVisibility() {
        setVisible(!visible);
    }

    function makeVerified() {
        firestore().collection('community-chat').doc(props.messageID).set({
            date: props.date,
            dislikes: props.dislikes,
            imageURL: props.imageURL ? props.imageURL : "",
            likes: props.likes,
            messageID: props.messageID,
            messageText: props.messageText,
            userID: props.userID,
            verified: true,
            video: props.video,
        })

        const ref = firestore().collection('news').doc()

        ref.set({
            date: props.date,
            imageURL: (props.imageURL) ? props.imageURL : "",
            newsID: ref.id,
            newsText: props.messageText,
            newsTitle: dialogMessage,
            pubID: props.messageID,
            pubImgURL: props.userImage
        })

        setVerified(true)
        setVisible(false)

    }

    function deletePost(){
        firestore().collection('community-chat').doc(props.messageID).delete()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={{ uri: props.userImage }} />
                <Text style={styles.userName}>{props.username}</Text>
                <View style={styles.adminButtons}>
                    {user.userType == 'admin' 
                        ? <TouchableOpacity style={styles.verifiedTouchable} onPress={() => deletePost()}>
                            <Image style={styles.trashIcon} source={require('../../Images/trashIcon.png')} />
                        </TouchableOpacity>: null}
                    <TouchableOpacity style={styles.verifiedTouchable} disabled={verified ? true : false} onPress={() => { switchVisibility() }}>
                        <Image style={styles.verified}
                            source={verified
                                ? require('../../Images/verifiedIcon.png')
                                : (user.userType == 'admin'
                                    ? require('../../Images/addVerifiedIcon.png')
                                    : null)}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.description}>{props.messageText}</Text>
            {props.imageURL && !props.video ? <Image style={styles.postImage} source={{ uri: props.imageURL }} /> : null}
            <View style={styles.footer}>

                <Text style={styles.date}>{new Date(props.date.seconds * 1000).toLocaleDateString("pt-PT")}</Text>
                <View style={styles.reactionContainer}>
                    <TouchableOpacity style={styles.reaction} onPress={() => { doLike() }}>
                        <Image style={styles.reactionIcons} source={require(`../../Images/like.jpg`)} />
                        <Text>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reaction} onPress={() => { doDislike() }}>
                        <Image style={styles.reactionIcons} source={require('../../Images/dislike.png')} />
                        <Text>{dislikes}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Make verified</Dialog.Title>
                <Dialog.Description>Write Title to the Publication</Dialog.Description>

                <Dialog.Input onChangeText={(text) => { setDialogMessage(text) }} />
                <Dialog.Button label="Cancel" onPress={() => { setVisible(false) }} />
                <Dialog.Button label="Confirm" onPress={() => { makeVerified() }} />
            </Dialog.Container>
        </View>
    );
};

export default CommunityCard;