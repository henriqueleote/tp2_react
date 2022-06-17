/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
        marginRight: 10,
        borderRadius: 20
    },
    userName: {
        fontWeight: 'bold',
        color: 'black'
    },
    description: {
        marginTop: 10,
        marginLeft:40,
        marginRight: 25,
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
        margin: 10,
        marginTop: 'auto',
        paddingTop: 20
    },
    verified: {
        width: 25, height:25, 
    },
    verifiedTouchable: {
        width: 50, height:50, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    date: {
        
    },
    reactionContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    reactionIcons: {
        
        width: 20,
        marginRight:10,
        height: 20
    },
    reaction: {
        flexDirection: 'row',
        marginLeft: 20
    },
    adminButtons: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    trashIcon:{
        width: 25, height: 25,
    }

    
})

module.exports = styles;