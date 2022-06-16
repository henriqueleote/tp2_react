import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


var styles = require('./styles');

const CommunityCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [dislikes, setDislikes] = useState(props.dislikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [reactionData, setReactionData] = useState({})


    const [user, setUser] = useState([]);


    // useEffect(() => {

    //     const checkUserReaction = async () => {

    //         user.map(async (single) => {
    //             let data = []
    //             await firestore().collection('community-chat-reactions')
    //                 .where('userID', '==', single.uid)
    //                 .where('messageID', '==', props.messageID)
    //                 .get().then(documentSnapshot => {
    //                     documentSnapshot.forEach(document => {
    //                         data.push(document.data());
    //                     })
    //                 });

    //             if (data.length > 0) {
    //                 if (data[0].type == 'like')
    //                     setIsLiked(true);
    //                 else if (data[0].type == 'dislike')
    //                     setIsDisliked(true);
    //             }

    //             setReactionData(data[0])

    //         })
    //     }

    //     const getUser = () => {
    //         let data = []

    //         firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
    //             data.push(documentSnapshot.data());
    //             setUser(data);
    //         })


    //         checkUserReaction()
    //     }
    //     getUser();
    // }, [])




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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={{ uri: props.userImage }} />
                <Text style={styles.userName}>{props.username}</Text>
                <Image style={styles.verified} source={props.verified ? require('../../Images/verifiedIcon.png') : null} />
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
        </View>
    );
};

export default CommunityCard;