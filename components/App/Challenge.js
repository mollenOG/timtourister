import { Text, View } from 'react-native'
import React from 'react'
import {challangeStyles} from "../../styles/homeStyleComp/challengeStyles";

export default function Challenge() {

    return (
        <View style={challangeStyles.container}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>WELCOME</Text>

        </View>
    )
}