import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image,TextInput } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const Missing = () => {
    const [missing, setMissing] = useState([]);
    useEffect(() => {
        const getMissing = async () => {
                var data = [];
            try {
                    firestore().collection('missing-board').orderBy("date").get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            data.push(documentSnapshot.data());
                        });
                        setMissing(data);
                });
            }
            catch (error) {
                console.log(error);
            }
        };

        getMissing();
    }, []);

    return (
        <ScrollView style>
            {missing.map((single) => {
            return (
                <View style={addItemStyles.wrapper}>
            <View>
                <Text>Item to give cash credit for:</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Test" style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Test" style={{justifyContent: 'flex-end',}} />
                    </View>
                </View>
            </View>

        </View>
            )
      }) }
        </ScrollView> 
    );
};

const addItemStyles  = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    inputLabels: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 7,
    },
    inputField: {
        backgroundColor: '#EEEEEE',
        padding: 10,
        color: '#505050',
        height: 50
    },
    inputWrapper: {
        paddingBottom: 20,
    },
    saveBtn: {
        backgroundColor: '#003E7D',
        alignItems: 'center',
        padding: 12,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
    }
});

export default Missing;