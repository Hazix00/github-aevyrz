import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyBQ1ZiLUnOJx-nlt5jN9cJXxVnpA52Z6mM",
    authDomain: "crown-db-59546.firebaseapp.com",
    projectId: "crown-db-59546",
    storageBucket: "crown-db-59546.appspot.com",
    messagingSenderId: "22345632122",
    appId: "1:22345632122:web:33a8888c16831c8d4eaec3",
    measurementId: "G-NYPF38SF3B"
}

initializeApp(config)

export const firestore = getFirestore()
export const auth = getAuth()

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => signInWithPopup(auth, provider)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUserProfileDocument = async (userAuth: User , additionalData?: any) => {
    console.log(userAuth)
    if(!userAuth) return undefined

    const userRef = doc(firestore ,`users/${userAuth.uid}`)
    try {
        
        const userSnap = await getDoc(userRef)
    
        console.log('createUserProfileDocument', userSnap.data())
        console.log('createUserProfileDocument exists', userSnap.exists())

        if(!userSnap.exists()) {
            const {displayName, email} = userAuth
            const createdAt = serverTimestamp()

            try {
                await setDoc(userRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch (error) {
                console.error('creating user profile document at firestore', error)
            }
        }

    } catch (error) {
        console.error('getting doc from firestore', error)
    }

    return userRef

}
