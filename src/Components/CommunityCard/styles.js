/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: 50,
        marginLeft:20,
        marginRight: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userIcon: {
        width: 30, height: 30,
        marginRight: 10
    },
    userName: {
        fontWeight: 'bold'
    },
    description: {
        marginLeft:40
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: {
        
    },
    reactionIcons: {
        width: 30,
        height: 30
    }

    
})

module.exports = styles;