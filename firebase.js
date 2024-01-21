import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
//import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"

//firestore -- database methods and functions
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  arrayUnion,
  increment
} from "firebase/firestore"

import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: "AIzaSyDzRRwr4XfXfU3v6EQEPwSGMFxvLW8jmJE",
  authDomain: "itec2023-8e953.firebaseapp.com",
  projectId: "itec2023-8e953",
  storageBucket: "itec2023-8e953.appspot.com",
  messagingSenderId: "466466419565",
  appId: "1:466466419565:web:1bfb16ebe3f233589e6064",
  measurementId: "G-YXXRKBHWCY"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore()

const userCollection = collection(firestore, "users")

//functie care updateaza id-ul user-ului
async function addUserId(mail,username,points,visited,id){

  await updateDoc(doc(firestore,"users",id),{
    username:username,
    mail:mail,
    points:points,
    visited:visited,
    photos:[],
    id:id,
    locationPh:[],
  })
}
// functie care creaza un nou user-ul
async function addNewUser(username, mail){
  const newUser = await addDoc(userCollection,{
    username:username,
    mail:mail,
    points:0,
    visited:[],
    photos:[],
    id:""
  }).then(res=>addUserId(mail,username,0,[],res.id))
  
}
//functie care extrage datele user-ului
async function getUser(mail){
  const user = query(
    collection(firestore,"users"),
    where("mail","==",mail)
  )
  const querySnapshot = await getDocs(user)
  const allDocs = querySnapshot.docs
  return allDocs[0].data()
}
//functie care adauga o poza facuta de user in baza de date
async function addPhotoToDB(id,location,url){
  await updateDoc(doc(firestore,"users",id),{
    photos:arrayUnion(url),
    locationPh:arrayUnion(location)
  })
}
//functie care extrage toate obiectivele turstice
async function getObjectives(){
  const getObj = query(
    collection(firestore,"objTurstice")
  )

  const querySnapshot = await getDocs(getObj)
  const allDocs = querySnapshot.docs
  return allDocs
}
//functie care verifica daca titlul trecut ca parametru este sau nu in lista de ob vizitate a user-ului
async function verifyVisited(mail,titleOb){
  const user = query(
    collection(firestore,"users"),
    where("mail","==",mail)
  )
  const querySnapshot = await getDocs(user)
  const allDocs = querySnapshot.docs
  let ok = 0;
  for(let i=0;i<allDocs[0].data().visited.length;i++){
    if(allDocs[0].data().visited[i] == titleOb){console.log("--");ok = 1;}
  }
  return ok;
}
//functie care updateaza lista de locatii vizitate
async function updateVerified(id,text){
  await updateDoc(doc(firestore,"users",id),{
    visited:arrayUnion(text)
  })
}
//functie care updateaza scorul userului
async function updatePoints(id,points){
  await updateDoc(doc(firestore,"users",id),{
    points:increment(Number(points))
  })
}
export {
  //storage
  firebase,

  //functii pt autentificare
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,

  addNewUser,
  getUser,
  addPhotoToDB,

  getObjectives,
  verifyVisited,
  updateVerified,
  updatePoints,
}