import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import MissingPost from '../Components/MissingPost/index.js';

const rows = 3;
const cols = 2;
const marginHorizontal = 7;
const marginVertical = 7;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = 200;

const stylesGrid = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxContainer: {
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        top: 0,
        height: '90%',
        width: '100%',
    },

    missingBigText: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginVertical: 10,
        fontSize: 24,
        color: 'black',

    },

    missingName: {
        position: 'absolute',
        bottom: 0,
        fontWeight: '500',
        fontSize: 17,
        color: '#333333',
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    border: {
        borderColor: '#000',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'black',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    borderTop: {
        borderColor: '#000',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 20,
        shadowColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },


})

const MissingCard = (props) => {
    return (
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('MissingPost')
        }}
        >
            <View style={[stylesGrid.boxContainer, styles.border]} >
                <Image style={[styles.body, styles.borderTop]} source={{ uri: props.fotoMissing }} />
                <Text style={styles.missingName}>{props.missingName}</Text>
            </View>
        </TouchableOpacity>
    );
}


const HomeScreen = () => {
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
        <View style={stylesGrid.scrollContainer}>
            <Text style={styles.missingBigText}>Missing Board</Text>
            <ScrollView style={stylesGrid.scrollContainer}>
                <View style={stylesGrid.sectionContainer}>
                    {missing.map((post) => {
                        return (
                            <MissingCard
                                key={post.missingID}
                                fotoMissing={post.fotoMissing}
                                missingName={post.missingName}

                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>

    );
};



export default HomeScreen;