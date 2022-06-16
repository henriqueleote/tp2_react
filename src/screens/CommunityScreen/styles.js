/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    header: {
        minHeight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    backArrow: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        marginRight: -50 ,
        marginLeft: 20
    },
    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'black',        
    },
    extraSpace: {
        marginBottom: 200
    }

})

module.exports = styles;