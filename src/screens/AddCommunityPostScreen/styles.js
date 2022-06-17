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
        borderWidth: 2,
        borderColor: '#929292',
        marginBottom: 20
    },
    container: {
        marginTop: 50,
        marginHorizontal: 30, 

    },
   

})

module.exports = styles;