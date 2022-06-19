import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
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
                    const _user = documentSnapshot.data();
                    setUser(_user);
                    setFirstName(_user.firstName);
                    setLastName(_user.lastName);
                    setPhoneNumber(_user.phoneNumber);
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
                        <View style={styles.SectionStyle} >
                            <TextInput style={{ width: 280}}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First name"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput style={{ width: 280}}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last name"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput style={{ width: 280}}
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
    
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#6d69c3',
        height: 40,
        width: 280
      },
      
    info: {
        marginTop: 40,
        fontSize: 14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100,
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