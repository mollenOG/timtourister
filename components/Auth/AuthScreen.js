import {View,Text,TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/core"
import { useEffect } from "react"

import { styles } from "../../styles/styles"

import {
    auth,
    onAuthStateChanged
} from "../../firebase.js"
import Spacer from "../helpers/Spacer"



export default function AuthScreen(){

    const navigation = useNavigation()

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
             //   navigation.replace("Home")
            }
        })
    })

    return(
        <View style={styles.container}>
            <Spacer height={100}/>
            
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate("LoginScreen")}}
                style={styles.entryPageButton}
            >
                <Text style={styles.entryPageText}>Login</Text>
            </TouchableOpacity>

            <Spacer height={30}/>

            <TouchableOpacity
                onPress={()=>{navigation.navigate("RegisterScreen")}}
                style={[styles.entryPageButton,styles.outlineButton]}
            >
                <Text style={[styles.entryPageText,styles.outlineText]}>Register</Text>
            </TouchableOpacity>

            
        </View>
    )

}