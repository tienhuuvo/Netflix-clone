
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDo4iNliw5xeRvn9FJkGEI0Sfr2oc-NlrE",
  authDomain: "netflix-clone-11efb.firebaseapp.com",
  projectId: "netflix-clone-11efb",
  storageBucket: "netflix-clone-11efb.appspot.com",
  messagingSenderId: "212550630727",
  appId: "1:212550630727:web:e6914db3bb983141422062",
  measurementId: "G-7NQ5VKR880",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
            password
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    } 
}

const logout  = () => {
    signOut(auth)
}

export { auth, db, login, signup, logout}