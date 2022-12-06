import { createContext, useEffect } from "react";
import { auth } from "../../_service/firebase/firebaseAuth.service";
import { useAuthState } from 'react-firebase-hooks/auth'
import { takeFavorite, takeWatching } from "../../_service/firebase/firebasesDb.service";

export const UserContext:any = createContext({
    user:null,
    isLoading: true,
    error: null
}
)

export const UserContextProvider = ({children}:any) => {
    const [ user, isLoading, error ] = useAuthState(auth);

    useEffect(() => {
        if(user) {
          takeFavorite(user.uid)
          takeWatching(user.uid)
        }
    }, [user])

    const contextValue = {
        user: user,
        isLoading: isLoading,
        error: error
    }

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}