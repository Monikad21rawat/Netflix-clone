
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";





const firebaseConfig = {
  apiKey: "AIzaSyCllwYiUcXXwHb3OOs4QHOmxMNwFx8WnhE",
  authDomain: "netflix-clone-760db.firebaseapp.com",
  projectId: "netflix-clone-760db",
  storageBucket: "netflix-clone-760db.appspot.com",
  messagingSenderId: "1015118933243",
  appId: "1:1015118933243:web:a916ec2d3d9af6c5e0545e"
};


const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
 try {
 const res=   await createUserWithEmailAndPassword(auth, email, password);
 const user = res.user;
 await addDoc (collection(db, "user"), {
    uid: user.uid,
    name,
    authprovider : "local",
    email,
 });
 } catch (error) {
    console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
 }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = ()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};