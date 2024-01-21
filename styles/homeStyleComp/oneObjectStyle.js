import { StyleSheet } from "react-native";

const oneObjectiveStyles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: "white",
    },


    photoEdit: {
        alignSelf: "center",
        height: 300,
        width: "100%",
        resizeMode: "cover",
        alignItems: "flex-end",
        justifyContent: "flex-end",


    },

    titleText: {
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontSize: 24,
        color: "black",

    },

    locationEdit: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        height: "80%",
        backgroundColor: "white",

        borderRadius: 30,
    },

    confirmLocEdit: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#46994e",

        borderRadius: 30,


    },

    rewardContainer: {
        width: "90%",
        height: 150,
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 10,

        justifyContent: "space-between",
    }
})



export {oneObjectiveStyles}