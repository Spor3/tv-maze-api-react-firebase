import { app } from "./firebase.config";
import { takeFavorite } from "./firebasesDb.service";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

export const registerUser = async (email: string, password: string, name: string) => {


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Signed in 
    const user = userCredential.user;
    //Set dissplayName
    await updateProfile(user, { displayName: name })

    const {uid, displayName } = user;

    localStorage.setItem('user', JSON.stringify({uid, displayName}))
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}

export const isUserConneted = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {

      const { uid, displayName } = user;
      console.log(user)
      const currentUser = { uid, displayName }
      localStorage.setItem('user', JSON.stringify(currentUser))
      takeFavorite(uid);
    } else {
      localStorage.setItem('user', '')
    }
  });
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const {uid, displayName } = user;

    localStorage.setItem('user', JSON.stringify({uid, displayName}))
    
  } catch (error: any) {
    const errorMessage = error.message;
    throw errorMessage;

  }
}
