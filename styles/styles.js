import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        backgroundColor: "white",
    },
    entryScreenLogo:{
        height:150,
        width:150
    },
    entryPageButton:{
        backgroundColor:"#7149C6",
        justifyContent: "center",
        alignItems:"center",
        width:"60%",
        height: 100,
        padding:15,
        borderRadius:10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    entryPageText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    outlineButton:{
        backgroundColor:"#AA77FF",
        marginTop:5,
        borderColor:"black",
        borderWidth:2
    },
    outlineText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    inputContainer:{
        width:"80%",
        justifyContent:"center",
        alignItems:"center",
    },
    authInput:{
        backgroundColor:"white",
        width:"100%",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    }
})

export {styles}