import { ActivityIndicator, Alert, Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import {useState} from 'react'
import * as ImagePicker from"expo-image-picker"
import {styles} from "../../styles/homeStyleComp/collectRewardStyle"
import {
    firebase,
    addPhotoToDB,
    getUser,
    auth
} from "../../firebase"
import { useNavigation } from '@react-navigation/core'

import GeolocationFnc from '../helpers/Functii/GeolocationFnc'
import Spacer from '../helpers/Spacer'
    
export default function CollectReward({route}){

    const navigator = useNavigation()

    const [check, setCheck] = useState(false)
    const [stop, setStop] =useState(true)

    const [image, setImage] = useState(null)
    const [userID, setUserID] = useState("")

    const [getting,setGetting] = useState(true)
    if(getting){
        getUser(auth.currentUser?.email).then(res=>{
            setUserID(res.id)
        })
        setGetting(false)
    }
    console.log(userID)

    //functii de incarcare poze
    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const source = {uri:result.assets[0].uri}

        console.log(source)

        setImage(source)

        setStop(false)
  
        const storage = firebase.storage();
  
        const response = await fetch(source.uri)
  
        const blob = await response.blob()
        
        const filename = source.uri.substring(source.uri.lastIndexOf('/')+1)
  
        const ref = storage.ref().child(filename);
        
        const snapshot = await ref.put(blob);
  
        let url = await ref.getDownloadURL();
        
        addPhotoToDB(userID,route.params.title,url)
        
        setStop(true)
        Alert.alert("Imagine inacarcata cu succes!")
        
        navigator.pop()
        
      }
  
  return (
    <View style={styles.container}>
        <Spacer height={50}/>
        <GeolocationFnc setCheck={setCheck} latOb={route.params.lat} longOb={route.params.long} title={route.params.title} points={route.params.points}/>
        <Spacer height={30}/>

        {
            check ? 
            <View>
                <View style={styles.containerBtnImg}> 
                    <Image source={require("../../styles/images/folder.png")} style={{height:40,width:40}}/>
                    <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
                        <Text style={{fontSize:18,padding:5}}>Incarca imagine</Text>
                    </TouchableOpacity>
                <Spacer/>
                </View>
                    {
                        !stop?<ActivityIndicator/>:<Text></Text>
                    }
            </View>
                :
                <View style={styles.containerBtnImg}> 
                    <Image source={require("../../styles/images/folder.png")} style={{height:40,width:40}}/>
                    <TouchableOpacity style={[styles.uploadBtn,{backgroundColor:"gray"}]}>
                        <Text style={{fontSize:18,padding:5}}>Incarca imagine</Text>
                    </TouchableOpacity>

                </View>

        }

        <Spacer height={30}/>
        <Text>   Pentru a incarca o imagine este necesara completarea locatiei</Text>
        
    </View>
  )
}