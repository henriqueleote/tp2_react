/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { block } from 'react-native-reanimated';

const styles = StyleSheet.create({

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

    
    scrollView: {
        marginBottom: 20,
        paddingBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: "column",
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    
    cardContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor:"#FFFFFF",
        borderRadius:30,
        marginHorizontal:15,
        marginTop: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    headerCard:{
        flex:1,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
    },

    profileImage:{
        width: 25,
        height: 25,
        borderRadius:100
    },

    profileName:{
        marginLeft:10,
        fontSize: 15
    },
    //AO DAR O TAMANHO À IMAGEM NAO FICA RESPONSIVE COMO FAÇO??
    missingImage:{
        height:200,
        resizeMode:'cover',
        width: '100%',
        
    },

    infoTextMissing:{
        flex:2,
        width: '100%',
        marginTop: 10,
        paddingLeft:10,
        paddingRight:10
    },

    text:{
        fontSize: 15,
        marginTop:5
    },

    comunication:{
        flexDirection: "row-reverse",
        marginTop:'auto',
        paddingLeft:30,
        paddingBottom:10,
        paddingTop:20
    },

    phoneIcon:{
        height:35,
        width: 35,
        marginRight:10
    },

    shareIcon:{
        height:35,
        width:35,
    }   
})

module.exports = styles;