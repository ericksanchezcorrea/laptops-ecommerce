// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, getIdToken } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { REACT_APP_API_KEY, REACT_APP_PROJECT_ID, REACT_APP_APP_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_AUTH_DOMAIN, REACT_APP_MESSAGE_IN_SENDER_ID } from "../config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY ,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGE_IN_SENDER_ID,
  appId: REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore()


export const loginWithGoogle = async () =>{
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)

  } catch (error) {
    console.log(error) 
  }
}

export const logOut = async () => {
  await signOut(auth)
}

export const token = async () =>{
  const token = await auth.currentUser.getIdToken()
  return token
}

export const uid = async () =>{
  const uid = auth.currentUser.uid
  return uid
}

export const db = async (uid) =>{
  try {
    const document = doc(firestore,`users/${uid}`)
    const documentRef = await getDoc(document)
    const result = await documentRef.data()
    
    if(!result) return
    return result.rol    
  } catch (error) {
    console.log(error.message)
  }

}

