import {ScrollView, Text, View, Image, RefreshControl, Linking} from 'react-native'
import {useState} from 'react'
import {styles} from "../../styles/homeStyleComp/profileStyles"
import {useNavigation} from "@react-navigation/core"

import {
    signOut,
    auth,
    firebase,
    getUser,
    addPhotoToDB
}from "../../firebase"

import Spacer from '../helpers/Spacer'
import LevelBar from '../helpers/LevelBar'
import {Foundation, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";


export default function Profile() {

    const navigation = useNavigation()

    const [username,setUsername] = useState("")
    const [imagesDB, setImagesDB] = useState([])
    const [images, setImages] = useState([])
    const [locationPh, setLocationPh] = useState([])
    const [points , setPoints] = useState(0)
    const [userID, setUserID] = useState("")

    const [getting,setGetting] = useState(true)
    if(getting){
        getUser(auth.currentUser?.email).then(res=>{
            setUsername(res.username)
            setImagesDB(res.photos)
            setPoints(res.points)
            setUserID(res.id)
            setLocationPh(res.locationPh)

            console.log(res)
        })
        setGetting(false)
    }


    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("** Logged of" )
        })
        .catch(err => alert(err))
    }

    let count = 0;

  return (
    <View style={styles.container}>
        <Spacer height={40}/>
        <View style={{width: "95%", flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.username}>{username}</Text>
            <MaterialCommunityIcons
                onPress={() => handleSignOut()}
                name="exit-run"
                size={40}
                color="#ff8080"
                style={{alignSelf: "center"}}
            />
        </View>
        <Spacer height={10}/>

        <View style={{height: 80, width: "100%", backgroundColor: "#e6ffee", padding: 10, flexDirection: "row"}}>
            {
                imagesDB.map(el => {

                    count += 1;
                    if(count === 1){
                        return <>
                        <MaterialIcons
                            onPress={() => alert("Ai vizitat un obiectiv turistic")}
                            name="badge"
                            size={50}
                            color="#003300"
                            style={{alignSelf: "center"}}
                        />
                            <Spacer height={10}/>
                        </>
                    }
                    if(count === 2){
                        return <>
                            <Foundation
                                onPress={() => alert("Ai vizitat doua obiective turistice")}
                                name="sheriff-badge"
                                size={50}
                                color="#003300"
                                style={{alignSelf: "center"}}
                            />
                            <Spacer height={10}/>
                        </>
                    }
                    if(count === 5){
                        return <>
                            <MaterialCommunityIcons
                                onPress={() => alert("Ai vizitat 5 obiective turistice")}
                                name="police-badge"
                                size={50}
                                color="#003300"
                                style={{alignSelf: "center"}}
                            />
                            <Spacer height={10}/>
                        </>
                    }
                })
            }
        </View>

        <Spacer height={10}/>
        <LevelBar points={points}/>

        <Spacer height={40}/>
        {
            imagesDB!==undefined?
            <ScrollView 
                showsVerticalScrollIndicator={false}
                snapToAlignment='center'
                refreshControl={
                    <RefreshControl onRefresh={
                        ()=>{
                            setGetting(true)
                            if(getting){
                                getUser(auth.currentUser?.email).then(res=>{
                                    setUsername(res.username)
                                    setImagesDB(res.photos)
                                    setPoints(res.points)
                                    setUserID(res.id)
                        
                                    // imagesDB.map(el=>{
                                    //     async () => {let ref = firebase.storage().ref(el)
                                    //     let url = await ref.getDownloadURL();
                                    //     let aux =  [url]
                                    //     aux = aux + images
                                    //     setImages(aux)
                                    //     }
                                    // })
                                    console.log(res)
                                })
                                setGetting(false)
                            }
                        }
                    }/>}    
            >
                <Text style={{alignSelf: "center", fontSize: 24}}>POZE  {imagesDB.length}</Text>
                <Spacer/>
            {
                imagesDB.map(el=>{
                    
                    return(
                        <View>
                            <Text style={{fontWeight: "bold", alignSelf: "center"}}>{locationPh[imagesDB.indexOf(el)]}</Text>
                            <Image style={{borderRadius: 10}} source={{uri:el}} width={300} height={300}/>
                            <Spacer height={40}/>
                        </View>
                    )
                })
            }
        </ScrollView>:<Text></Text>
        }
    </View>
  )
}