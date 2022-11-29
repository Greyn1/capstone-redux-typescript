// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    User,
    NextOrObserver
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { Category } from "../Store/categories/categories.types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEeNzlTEmzLNHQZ4PDAegK3RHD7BAY3_w",
    authDomain: "crwn-clothing-a1cfe.firebaseapp.com",
    projectId: "crwn-clothing-a1cfe",
    storageBucket: "crwn-clothing-a1cfe.appspot.com",
    messagingSenderId: "402109251898",
    appId: "1:402109251898:web:2c187eba8895594b2b1003"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

const db = getFirestore();

export type ObjectToAdd = {
    title : string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey : string, 
    objectsToAdd : T[]) : Promise<void>=> {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
     });
   
     await batch.commit();
     console.log('done');
}

export const getCategoriesAndDocuments = async () : Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
    // .reduce((acc, docSnapshot) => {
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {});
  
    // return categoryMap;
  };

export type AdditionalInformation = {
    displayName ?: string;
} 

export type UserData = {
    createdAt : Date;
    displayName : string;
    email : string;
}

export const createUserDocumentFromAuth = async (
    userAuth : User, 
    additionalInformation = {} as AdditionalInformation
    ) : Promise<void | QueryDocumentSnapshot<UserData>> => {
    const userDocRef = doc(db, "users", userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
    if(!email || !password) return ;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
    if(!email || !password) return ;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback:NextOrObserver<User>) => onAuthStateChanged(auth, callback);