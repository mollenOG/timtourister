import {ScrollView, Text, View} from 'react-native'
import {useState} from 'react'
import {objectiveStyles} from "../../styles/homeStyleComp/objectiveStyles";
import Spacer from "../helpers/Spacer";
import ObjectiveComponent from "./homeComponents/objectComponent";

import{
    getObjectives
} from "../../firebase"

export default function Objective() {

    const [objectives, setObjectives] = useState([])
    const [trigger, setTrigger] = useState(true)
    if(trigger){
        
        getObjectives().then(res=>{
            let aux = []
            for(let i=0;i<res.length;i++){
                aux.push({
                    address: res[i].data().address,
                    lat: res[i].data().lat,
                    long: res[i].data().long,
                    linkImg: res[i].data().linkImg,
                    points: res[i].data().points,
                    tags: res[i].data().tags,
                    title:res[i].data().title,
                    website:res[i].data().website
                })
            }
            setObjectives(aux)
        })
        setTrigger(false)
    }


    return (
        <View style={objectiveStyles.container}>
            <Spacer height={50}/>

            <ScrollView contentContainerStyle={{width:"100%"}} showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center", padding: 20}}>
                    <Text style={{fontSize: 32}}>Hello!</Text>
                    <Text style={{fontSize: 24}}>What are you up to do today?</Text>
                </View>

                <Spacer/>

                {
                    objectives.map(obj=>{
                        return(
                            <View style={{width:"100%"}}>
                                <ObjectiveComponent 
                                    photoLink={obj.linkImg}
                                    nameObj={obj.title}
                                    score={obj.points}
                                    address={obj.address}
                                    lat={obj.lat}
                                    long={ obj.long}
                                    tags={ obj.tags}
                                    website={obj.website}
                                />
                                <Spacer height={30}/>
                            </View>
                        )
                    })
                }
                <Spacer height={50}/>
            </ScrollView>
        </View>
    )
}