import React from 'react';
import { View, Image, Text, ScrollView, Linking, Platform , TouchableHighlight, Share } from 'react-native';


var styles = require('./styles');

const MissingPost = (props) => {
    const userPic = props.userFoto + "a ";
    const missingPic = props.fotoMissing + "a ";
    
    const makeCall = async () =>{
        let phone;
        if(Platform.OS === 'android'){
            phone='tel:${' + props.phoneNumber+ '}';
        }else{
            phone='telprompt:${' + props.phoneNumber + '}';
        }
        Linking.openURL(phone);
    }

    const share = async  () =>{
        
            const result = await Share.share({
              message:
                'Missing Person: ' + props.missingName + '|' 
                + '\n Age: ' + props.missingAge + '\n' 
                + 'Description: ' + props.description,});
            
};
        

    return (

            <View showsHorizontalScrollIndicator style={styles.scrollView}>
                    <View style={styles.headerCard}>
                        <Image style={styles.profileImage} source={{uri: userPic}} />
                        <Text style={styles.profileName}>{props.username}</Text>
                    </View>
                    <Image style={styles.missingImage} source={{uri: missingPic}} />
                    <View style={styles.infoTextMissing}>
                        <Text style={styles.text}>{props.missingName}</Text>
                        <Text style={styles.text}>{props.missingAge}</Text>
                        <Text style={styles.text}>{props.description}</Text>
                    </View>

                    <View style={styles.comunication}>

                    
                    <TouchableHighlight onPress={()=>{share()}}>
                        <Image style={styles.shareIcon} source={require('../../Images/share.png')} />
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>{makeCall()}}>
                        <Image  style={styles.phoneIcon} source={require('../../Images/phone.png')} />
                    </TouchableHighlight>
                    </View>
            </View>

    );
};

export default MissingPost;