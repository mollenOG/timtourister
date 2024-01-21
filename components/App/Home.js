import React from 'react'
import {homeStyles} from "../../styles/homeStyles"

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Challenge from "./Challenge";
import Objective from "./Objective";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (

      <Tab.Navigator tabBarOptions={homeStyles.tabBarOptions}>

          <Tab.Screen name={"Challenge"} component={Challenge} options={homeStyles.challengeOption}/>
          <Tab.Screen name={"Objective"} component={Objective} options={homeStyles.objectiveption}/>
          <Tab.Screen name={"Profile"} component={Profile} options={homeStyles.profileOption}/>

      </Tab.Navigator>
  )
}