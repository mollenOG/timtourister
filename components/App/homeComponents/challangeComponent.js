import {Text, View, Image, TouchableOpacity} from "react-native";
import {challangeStyles} from "../../../styles/homeStyleComp/challengeStyles";
import React from "react";
import Spacer from "../../helpers/Spacer";

export default function ChallengeComponent() {

    return (
        <TouchableOpacity style={challangeStyles.challangeComponent}>

            <Spacer height={100}/>
        <Image style={challangeStyles.photo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
            <Spacer height={100}/>
            <Image style={challangeStyles.photo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
            <Spacer height={100}/>
            <Image style={challangeStyles.photo} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>

            <Text>Score: 100</Text>

        </TouchableOpacity>
    )
}
