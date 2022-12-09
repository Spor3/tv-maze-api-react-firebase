import { app } from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(app);

export const registerUser = async (email: string, password: string, name: string) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Signed in 
    const user = userCredential.user;
    //Set dissplayName
    await updateProfile(user, { displayName: name })
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}

export const logOut = async () => {

  try {
    await signOut(auth)
    
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}

export const loginUser = async (email: string, password: string) => {


  try {
    await signInWithEmailAndPassword(auth, email, password);  
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}
