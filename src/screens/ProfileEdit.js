import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const ProfileEdit = () => {
    const [user, setUser] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const getUser = async () => {
            try {
                firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
                    setUser(documentSnapshot.data());
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setPhoneNumber(user.phoneNumber);
                })
            }
            catch (error) {
                console.log(error);
            }
        };
        getUser();
        
    }, []);

    function save() { 
        if (firstName.trim().length == 0) alert('Type in first name');
        else if (lastName.trim().length == 0) alert('Type in last name');
        else if (phoneNumber.trim().length == 0) alert('Type in phone number');
        else {
            try {
                firestore().collection('users').doc(auth().currentUser.uid).update({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber
                })
                navigation.goBack();
            }
            catch (error) {
                console.log(error);
            }
        }

    };
    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                    <Image style={styles.userImg} source={user.imageURL !== 'null' ? { uri: user.imageURL } : require('../Images/unknown.png')} />
                    <View style={styles.info}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First name"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last name"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Phone number"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.logout} onPress={() => save()} >
                        <Text style={{ color: '#ffffff' }}>SAVE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </ScrollView>
    );
};


export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    info: {
        marginTop: 40,
        fontSize: 14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100,
        marginRight: 150
    },
    editName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logout: {
        width: 100,
        marginTop: 50,
        borderRadius: 9,
        padding: 10,
        borderTopLeftRadius: 6,
        borderBottomRightRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#2E98F0',
        elevation: 10,
    },
});