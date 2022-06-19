/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
        backArrow: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        left: 3
    },
    arrowContainer: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: 30,
        height: 30,
        marginRight: 50,
        marginLeft: 20,
        padding:20
    },
    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'black',
    },
    extraSpace: {
        marginBottom: 200
    },
    touchableOpacity: {
        position: 'absolute',
        width: 50, height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30, 
        bottom:100, 
        elevation: 20,
        borderRadius: 20
        
    },
    floatButton: {
        resizeMode: 'contain',
        width: 50, height: 50, 
    },
    container:{
        flex: 1,
    }

})

module.exports = styles;