import { app } from "./firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const registerUser = async (email: string, password: string, name: string) => {


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Signed in 
    const user = userCredential.user;
    //Set dissplayName
    updateProfile(user, { displayName: name })
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}

export const isUserConneted = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {

      const { uid, displayName } = user;
      const currentUser = { uid, displayName }
      localStorage.setItem('user', JSON.stringify(currentUser))

    } else {
      localStorage.setItem('user', '')
    }
  });
}


export const loginUser = async (email: string, password: string) => {


  try {
    await signInWithEmailAndPassword(auth, email, password)
    
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}
