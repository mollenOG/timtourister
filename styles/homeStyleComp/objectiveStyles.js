import { StyleSheet } from "react-native";

const objectiveStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "white",

    },

    objectiveComponent: {
        height: 130,
        width: "90%",
        borderRadius: 10,
        backgroundColor: "white",


        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-between",


        elevation: 1

    },

    photoEdit: {
        height: "100%",
        width: "80%",
        padding:15,
        resizeMode: "cover",
        borderRadius:10
    }
})

export {objectiveStyles}