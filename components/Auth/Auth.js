import React from 'react'
import { createNativeStackNavigator } from  '@react-navigation/native-stack';


import Register from "./RegisterScreen"
import Login from "./LoginScreen"
import AuthScreen from "./AuthScreen"

const Stack = createNativeStackNavigator();

export default function Auth () {
  return (
    <Stack.Navigator initialRouteName={"AuthScreen"}>

        <Stack.Screen options={{headerShown:false}} name="AuthScreen" component={AuthScreen}/>
        <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={Login}/>
        <Stack.Screen options={{headerShown:false}} name="RegisterScreen" component={Register}/>

    </Stack.Navigator>
  )
}