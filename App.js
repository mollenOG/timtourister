import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from  '@react-navigation/native-stack';
import Auth from "./components/Auth/Auth"
import Home from "./components/App/Home";
import OneObjectiveScreen from "./components/App/OneObjectiveScreen";
import CollectReward from './components/App/CollectReward';
import {auth, onAuthStateChanged} from "./firebase";
import {useEffect, useState} from "react";


const Stack = createNativeStackNavigator()

export default function App() {
    const [isLogged, setIsLogged] = useState(!!auth.name)
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            console.log("** app L19", user);
            if(user){
                setIsLogged(true)
            }else{
                setIsLogged(false)
            }
        })
    })

    const homeStackNavigator = () => {
      return  <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen options={{headerShown:false}} name="Home" component={Home}/>
          <Stack.Screen options={{headerShown:false}} name={"OneObjectiveScreen"} component={OneObjectiveScreen}/>
          <Stack.Screen options={{headerShown:false}} name={"CollectRewardScreen"} component={CollectReward}/>
          </Stack.Navigator>
  }
  
  const signinStackNavigator = () => {
      return (<Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={"Auth"} component={Auth}/>
      </Stack.Navigator>)
  }

  return (
    <NavigationContainer>
        {isLogged ? homeStackNavigator() : signinStackNavigator()}
    </NavigationContainer>
  );

}