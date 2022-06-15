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


    useEffect(() => {

        const checkUserReaction = async () => {

            user.map(async (single) => {
                let data = []
                await firestore().collection('community-chat-reactions')
                    .where('userID', '==', single.uid)
                    .where('messageID', '==', props.messageID)
                    .get().then(documentSnapshot => {
                        documentSnapshot.forEach(document => {
                            data.push(document.data());
                        })
                    });

                data.forEach(post => {
                    console.log('Checking: ' + post.userID + " messageID: " + post.messageID)

                })

                console.log('Lengtht: ' + data.length)

                if (data.length > 0) {
                    if (data[0].type == 'like')
                        setIsLiked(true);
                    else if (data[0].type == 'dislike')
                        setIsDisliked(true);
                }

                setReactionData(data[0])

            })
        }

        const getUser = () => {
            let data = []

            firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
                data.push(documentSnapshot.data());
                setUser(data);
            })


            checkUserReaction()
        }



        getUser();
    }, [])


    function doLike() {
        if (!isLiked) {
            setLikes(likes + 1);
            setIsLiked(true)
            if (isDisliked) {
                //Dar update da firebase da reação para like
                // firestore().collection('community-chat-reactions').doc(props.messageID)
                // .update({

                // })          
                setIsDisliked(false)
                setDislikes(dislikes - 1)
            } else {
                //Adicionar na firebase uma reação
            }
        } else {
            alert('You have already liked this post')
        }
    }

    function doDislike() {
        if (!isDisliked) {
            setDislikes(dislikes + 1);
            setIsDisliked(true)
            if (isLiked) {
                //Dar update da firebase da reação para dislike
                // firestore().collection('community-chat-reactions').doc(props.messageID)
                // .update({

                // })    
                
                //Decrementar um valor da BD dos likes
                setIsLiked(false)
                setLikes(likes - 1)
            } else {
                //Adicionar na firebase uma reação
            }

            //Incrementar um valor dos dislikes na BD
        } else {
            alert('You have already disliked this post')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.userIcon} source={{ uri: props.userImage }} />
                <Text style={styles.userName}>{props.username}</Text>
            </View>

            <Text style={styles.description}>{props.message}</Text>
            <Image style={styles.postImage} source={{ uri: props.image }} />
            <View style={styles.footer}>

                {/* TO DO: formatar a data */}
                <Text style={styles.date}>{props.date}</Text>
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