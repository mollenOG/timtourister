import {View, Text,TouchableOpacity, Alert,ActivityIndicator,Image} from "react-native"
import {useEffect, useState} from "react";
import Spacer from "../Spacer";
import { useNavigation } from "@react-navigation/core";

import * as Location from 'expo-location';
import{
    updateVerified,
    auth,
    getUser,
    updatePoints
} from "../../../firebase" 

import {styles} from "../../../styles/homeStyleComp/collectRewardStyle"

export function verifyLocation(latOb,longOb,latOm, longOm){
    console.log(latOb,latOm)
    console.log(longOb,longOm)
    if(latOm >=latOb-0.01 && latOm <=latOb+0.01  && longOm>=longOb-0.01  && longOm<=longOb+0.01 ){
        return true;
    }
    return false
}

export default function Geolocation({setCheck, latOb, longOb, title, points}) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [trigger, setTrigger] = useState(true)
    const [userId, setUserId] = useState("")
    const [stop, setStop] = useState(false)
    const [culoare,setCuloare] = useState("gray")

    const navigator = useNavigation()

    if(trigger){
        getUser(auth.currentUser?.email).then(res=>{
            setUserId(res.id)
        })
        console.log(userId)
        setTrigger(false)
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }else{
                console.log("AI INTRAT")
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setStop(true)
            setCuloare("#99bf3f")
            
        })();
    }, []);

    let textLatitud = 'WaitingForLatitud..';
    let textLongitud = 'WaitingForLongitud..';
    if (errorMsg) {
        textLatitud = errorMsg;
        textLongitud = errorMsg;
    } else if (location) {
        textLatitud = JSON.stringify(location.coords.latitude);
        textLongitud = JSON.stringify(location.coords.longitude);
    }

    return (
        <View style={styles.card}>
            <Text style={{fontSize:32}}>Felicitari!</Text>
            <Spacer/>
            {
                !stop?
                <View>
                    <Spacer/>
                    <View>
                        <Text>Se cauta locatia...</Text>
                        <ActivityIndicator/>
                    </View>
                </View>
                :<Text></Text>
            }
            <Spacer/>
            <TouchableOpacity style={[styles.checkinBtn,{backgroundColor:culoare}]} onPress={()=>{
                    if(textLatitud == 'WaitingForLatitud..' && textLongitud == 'WaitingForLongitud..'){
                        console.log(1)
                    }else{
                        console.log(2)
                        if(verifyLocation(latOb, longOb,textLatitud,textLongitud)){
                            updateVerified(userId,title)
                            updatePoints(userId,points)
                            Alert.alert("Felicitari! Ai castigat recompensa!")
                            //navigator.pop()
                            setCheck(true)
                        }else{
                            Alert.alert("Nu trisa!")
                        }
                    }
                }}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Check in!</Text>
            </TouchableOpacity>
            <Spacer height={50}/>
        </View>
    );
}