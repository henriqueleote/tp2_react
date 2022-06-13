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
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        marginRight: -40 ,
        marginLeft: 20
    },
    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'black',        
    }

})

module.exports = styles;