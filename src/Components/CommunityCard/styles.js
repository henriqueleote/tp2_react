/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft:20,
        marginRight: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        minHeight: 150
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userIcon: {
        width: 30, height: 30,
        marginRight: 10
    },
    userName: {
        fontWeight: 'bold',
        color: 'black'
    },
    description: {
        marginTop: 10,
        marginLeft:40
    },
    postImage:{
        flex: 1,
        width: '80%',
        resizeMode: 'cover',
        height: 100,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        marginRight: 10
    },
    
    date: {
        
    },
    reactionContainer: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    reactionIcons: {
        width: 20,
        marginRight:20,
        height: 20
    }

    
})

module.exports = styles;