import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        backgroundColor:"white"
    },
    card:{
        width:"90%",
        height:200,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "white",
        borderRadius:10,
    },
    checkinBtn:{
        height:120,
        width:200,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
    },
    containerBtnImg:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:"50%",


    },
    uploadBtn:{
        backgroundColor:"#ff8080",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        borderEndWidth:2,
        borderBottomWidth:2,
    }
})

export {styles}