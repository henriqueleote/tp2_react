/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    container:{
        backgroundColor:"#F1EFEF"
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },

    title: {
        fontSize: 20,
        color: "#000000",
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
    },

    arrowBack: {
        width: 30, 
        height: 30,
        marginLeft: 10,
        marginRight: -30
    },

    /*
    scrollView:{
        
        width:'100%',
        height: '100%',
    },
    */
    cardContainer: {
        justifyContent: 'center',
        backgroundColor:"#FFFFFF",
        height: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
        marginHorizontal:15,
        marginTop:15
    },

    headerCard:{
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        
    },

    profileImage:{
        width: 25,
        height: 25,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        
    },

    profileName:{
        marginLeft:10
    },

    allInfoAboutMissing:{
        width: '100%',
        height: '83%',
    },

    missingImage:{
        width: '100%',
        height: '40%',
    },
    infoTextMissing:{
        width: '100%',
        height: '60%',
        marginTop: 10,
        marginLeft:5
    },
    missingName:{
        fontSize: 15,
    },
    missingAge:{
        fontSize:15
    },
    missingDescription:{
        fontSize:15
    }
    
    
})

module.exports = styles;