import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  console.log('oi');

  const handlePasswordVisibility = () => {
    if (passwordVisibility === true) {
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordVisibility === false) {
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const signin = () => {
    try {
      if (email.trim().length == 0) alert('Type in email')
      else if (password.trim().length == 0) alert('Type in password')
      else auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.SectionStyle}>
        <Image source={require('../Images/email.png')} style={styles.ImageStyle}></Image>
        <TextInput style={{ flex: 1 }}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType='email-address'
          autoCompleteType='off'
        />
      </View>
      <View style={styles.SectionStyle}>
        <Image source={require('../Images/key.png')} style={styles.ImageStyle}></Image>
        <TextInput style={{ flex: 1 }}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Image source={passwordVisibility ? require('../Images/eye-off.png') : require('../Images/eye.png')} style={{ width: 20, height: 14 }}></Image>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity style={styles.buttons} title="" onPress={signin}>
          <Text style={{ color: '#ffffff' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    marginBottom: 30,
  },
  input: {
    borderColor: '#6d69c3',
    marginVertical: 10,
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#6d69c3',
    height: 40,
    margin: 10,
    width: 280
  },

  ImageStyle: {
    padding: 13,
    margin: 5,
    height: 14,
    width: 14,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  buttons: {
    width: 150,
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