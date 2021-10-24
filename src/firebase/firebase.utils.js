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

export const createUserProfileDocument= async(userAuth, additionalData=null) =>{
    if(!userAuth) return

    const userRef= firestore.doc(`users/${userAuth.uid}`)
    console.log('ref '+userRef)
    const snapShot= await userRef.get()
    console.log('snapshot '+snapShot.data())
    console.log(snapShot.exists)
    if(!snapShot.exists){
        const {displayName, email} =userAuth
        const createdAt= new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating users', error.message)
        }

    }

    return userRef

}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef= firestore.collection(collectionKey)
    const batch= firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef,obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap=(collections) =>{
    const transformedCollection= collections.docs.map(doc => {
        const {title, items}= doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection)=> {
        accumulator[collection.title.toLowerCase()]= collection
        return accumulator
    }, {})
}

export const getCurrentUser = ()=> {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

export const auth = firebase.auth()
export const firestore= firebase.firestore()

export const googleProvider= new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = ()=>auth.signInWithPopup(googleProvider)

export default firebase