import React, {useState, useEffect, useContext} from 'react';
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
    const userRef = firestore().collection('users').doc(auth().currentUser.uid);
    useEffect(() => {
        const getUser = async () => {
                var data = [];
            try {
                firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(documentSnapshot => {
                        data.push(documentSnapshot.data());
                        setUser(data);
                    })
            }
            catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, []);

    return (
        <ScrollView style={{padding:20}}>
            {user.map((single) => {
            return (
                    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: single.imageURL }}
        />
              <Text style={styles.userName}>
                  {single.firstName + " "}
                  {single.lastName}
              </Text>
              
        <Button title='Logout' onPress={() => logout()}></Button>
      </ScrollView>
    </SafeAreaView>
            )
      }) }
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
    fontSize: 18,
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
});