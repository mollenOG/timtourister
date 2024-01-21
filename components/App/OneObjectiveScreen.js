import {View, Text, ScrollView, ImageBackground, Linking, TouchableOpacity,Platform, Image} from "react-native";
import {oneObjectiveStyles} from "../../styles/homeStyleComp/oneObjectStyle";
import Spacer from "../helpers/Spacer";
import {Entypo, Foundation, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import miniComponentTags from "./homeComponents/miniComponentTags";
import { useState } from "react";

import {
    verifyVisited,
    auth
} from "../../firebase"
import {LinearGradient} from "expo-linear-gradient";


export function useLocation(lat,long){
    if(Platform.OS === 'ios'){
        return Linking.openURL('maps://app?daddr='+lat+'+'+long)
    }else{
        return Linking.openURL('google.navigation:q='+lat+'+'+long)
    } 
}

export default function OneObjectiveScreen({route}) {
    console.log(route.params.website);
    const navigator = useNavigation()

    const [verified, setVerified] = useState(false)
    const [ok, setOK] = useState(0)
    if(verified===false){
        verifyVisited(auth.currentUser?.email,route.params.nameObj).then(res=>{
            setOK(res)
        })
        setVerified(true)
    
    
    }

    return (
        <ScrollView style={oneObjectiveStyles.container} showsVerticalScrollIndicator={false}>

            <Image style={oneObjectiveStyles.photoEdit} source={{uri: route.params.photoLink}}/>
            <Text style={oneObjectiveStyles.titleText}>   {route.params.nameObj}</Text>

            <View style={{flexDirection: "row"}}>
                {route.params.tags.map(e => {
                    return miniComponentTags(e)
                })}
            </View>

            <Spacer height={20}/>

            <View style={oneObjectiveStyles.rewardContainer}>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <View style={{flex: 2, justifyContent: "center"}}>
                        <Text style={{color: "#fbb040", fontWeight: "bold", fontSize: 24}}> Reward:</Text>
                        <Text style={{color: "#fbb040", fontWeight: "bold", fontSize: 32}}>  {route.params.points}</Text>
                    </View>
                    <View style={{flex:1, alignSelf: "center", justifyContent: "center"}}>
                        <Image style={{height: "100%", width: "100%"}} source={require("../../styles/images/cupitza.png")}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    {
                        ok?

                            <TouchableOpacity
                                style={[oneObjectiveStyles.confirmLocEdit,{backgroundColor:"gray"}]}
                            >

                                <Text style={{alignSelf: "center", color: "white"}}>Recompensa colectata!</Text>
                            </TouchableOpacity>

                            :

                            <TouchableOpacity
                                style={oneObjectiveStyles.confirmLocEdit}
                                onPress={() => navigator.navigate("CollectRewardScreen",{
                                    lat:route.params.lat,
                                    long:route.params.long,
                                    title:route.params.nameObj,
                                    points:route.params.points
                                })}
                            >

                                <Text style={{alignSelf: "center", color: "white"}}>Colecteaza recompensa!</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>

            <Spacer height={50}/>

            <View style={oneObjectiveStyles.rewardContainer}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 3}}>
                        <TouchableOpacity
                            style={oneObjectiveStyles.locationEdit}
                            onPress={() => useLocation(route.params.lat,route.params.long)}
                        >
                            <Text style={{alignSelf: "center", color: "black"}}>Vezi locatia obiectivului</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>

                        <Entypo
                            onPress={() => useLocation(route.params.lat,route.params.long)}
                            name="location-pin"
                            size={70}
                            color="black"
                            style={{alignSelf: "center"}}
                        />
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    { route.params.website !== "null"?
                        <>
                        <View style={{flex: 3}}>
                            <TouchableOpacity
                                style={oneObjectiveStyles.locationEdit}
                                onPress={() => Linking.openURL(route.params.website)}
                            >
                                <Text style={{alignSelf: "center", color: "black"}}>Vizualizati website-ul oficial</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                    {
                        route.params.website!=="null" ?
                        <Foundation
                        onPress={() => Linking.openURL(route.params.website)}
                        name="web"
                        size={70}
                        color="black"
                        style={{alignSelf: "center"}}
                        />:<Text></Text>
                    }
                        </View>
                        </>:<Text></Text>
                    }
                </View>
            </View>

        </ScrollView>
    )
}