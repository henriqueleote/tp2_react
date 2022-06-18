import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoginScreen from './Login';

async function logout() {
  await auth().signOut()
    .then(() => {
      console.log('logged out');
      return <LoginScreen />;
    })
    .catch(error => console.log(error));
}

const ProfileScreen = () => {
  const [user, setUser] = useState([]);
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
    };
    getUser();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
          <Image style={styles.userImg} source={user.imageURL !== 'null' ? { uri: user.imageURL } : require('../Images/unknown.png')} />
          <View style={styles.editName}>
            <Text style={styles.userName}> {user.firstName} {user.lastName} </Text>
            <TouchableOpacity >
              <Image source={require('../Images/pencil.png')} style={{height: 21, width: 21, marginLeft: 10}}></Image>
            </TouchableOpacity>
          </View>
          <Text>{user.userType}</Text>
          <View style={styles.info}>
            <Text >Email: {user.email}</Text>
            <Text >Contact: {user.phoneNumber}</Text>
          </View>
          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: '#ffffff' }}>Publications in Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: '#ffffff' }}>Publications in Missing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logout} onPress={() => logout()} >
            <Text style={{ color: '#ffffff' }}>LOG OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};


export default ProfileScreen;

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
  buttons: {
    width: 190,
    marginTop: 30,
    borderRadius: 9,
    padding: 10,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DE2F2F',
    elevation: 10,
    marginRight: 150
  },
  info: {
    marginTop: 40,
    fontSize: 14,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    marginRight: 150
  },
  editName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logout: {
    width: 100,
    marginTop: 30,
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