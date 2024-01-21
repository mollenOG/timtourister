import { View,Text } from "react-native";

export function getLevel(points){
    let k = 0;
    let nr = 0;
    do{
        nr+=1;
        k = nr *200;
    }while(k<=points);
    return nr;
}

export function percent(points,level){
    let total = level * 200
    let percent = points*100 / total
    return percent
}

export default function LevelBar({points}){
    return (
        <View style={{width:"100%",alignItems:"center"}}>
            <Text style={{fontSize:24, color: "black", alignSelf: "flex-start"}}>  Nivelul: {getLevel(points)}</Text>
            <View style={{width:"90%",height:20,backgroundColor:"#e6ffee",borderRadius:50}}>
                <View style={{height:20,width:String(percent(points,getLevel(points)))+"%",backgroundColor:"#66ff99",borderRadius:50}}>
                    <Text></Text>
                </View>
            </View>
            <Text style={{fontSize:16, color: "black", alignSelf: "flex-end"}}>Puncte: {points}/{getLevel(points)*200}   </Text>
        </View>
    )
}