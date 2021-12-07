import firebase  from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAXRmt_nh13E0CCL8GXhQ-OYvC-JY6-FTg",
    authDomain: "firstreact-e18f7.firebaseapp.com",
    projectId: "firstreact-e18f7",
    storageBucket: "firstreact-e18f7.appspot.com",
    messagingSenderId: "753127781370",
    appId: "1:753127781370:web:b89e3950acc3a181d02a43",
    measurementId: "G-GCJZP6WF7M"
  };
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get()

    console.log('snupshot', snapshot)
    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
           userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalData
           })
      }catch (error){
           console.log('error creating user', error.message)
      }
    }

    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

