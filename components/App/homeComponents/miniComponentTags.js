import { View, Text } from "react-native";
import React from "react";
import Spacer from "../../helpers/Spacer";

export default function miniComponentTags(cuv) {

    return (
        <View style={{flexDirection: "row", paddingLeft: 20}}>
            <Spacer height={25}/>
            <Text style={{backgroundColor: "#B0DAFF", fontSize: 16, borderRadius: 10}}> {cuv} </Text>
        </View>
    )
}