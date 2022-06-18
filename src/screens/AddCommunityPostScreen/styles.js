/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        minHeight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    touchableOpacity: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -70, // To Title be centered on screen with auto margin
        marginLeft: 20
    },
    arrowBack: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',

    },
    pageTitle: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 24,
        color: 'black',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#929292',
        marginBottom: 20,
        borderRadius: 5,
    },
    container: {
        marginTop: 50,
        marginHorizontal: 50, 
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
        marginRight: 10,
        padding:20
    },

    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: 100,
        height: 80,
    },
   

})

module.exports = styles;