import {Image, View, Text, TouchableOpacity} from "react-native";
import React from "react";
import {objectiveStyles} from "../../../styles/homeStyleComp/objectiveStyles";

import {useNavigation} from "@react-navigation/core";
import OneObjectiveScreen from "../OneObjectiveScreen";

export default function ObjectiveComponent({photoLink,nameObj,score,address,lat,long,tags,website,}) {
    const navigator = useNavigation();

    return (

        <TouchableOpacity style={objectiveStyles.objectiveComponent}
            onPress={() => navigator.navigate('OneObjectiveScreen', {
                photoLink: photoLink,
                nameObj: nameObj,
                points: score,
                address: address,
                website: website,
                tags: tags,
                lat: lat,
                long: long,
            })}>
            <View style={{width:"50%"}}>
                <Image style={objectiveStyles.photoEdit} source={{uri: photoLink}}/>
            </View>
            <View style={{ flexDirection: "column",width:"50%"}}>
                <Text style={{justifyContent: "center", fontWeight: "bold"}}>{nameObj}</Text>
                <Text>Points:
                    <Text style={{fontWeight: "bold", color: "#59339e"}}> {score}</Text>
                </Text>
            </View>

        </TouchableOpacity>

    )
}