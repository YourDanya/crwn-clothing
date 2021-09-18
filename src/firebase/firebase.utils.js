import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config= {
    apiKey: "AIzaSyASh21U6c2wqioKlJcU8w5DyLzJo_6IjNk",
    authDomain: "crwn-db-88eda.firebaseapp.com",
    projectId: "crwn-db-88eda",
    storageBucket: "crwn-db-88eda.appspot.com",
    messagingSenderId: "279339741646",
    appId: "1:279339741646:web:37e5079b7699575a33fb9f",
    measurementId: "G-XK5N2KLBMF"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore= firebase.firestore()

const provider= new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = ()=>auth.signInWithPopup(provider)

export default firebase