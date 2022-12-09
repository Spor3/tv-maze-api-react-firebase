import { createContext } from "react";
import { auth } from "../../_service/firebase/firebaseAuth.service";
import { useAuthState } from 'react-firebase-hooks/auth'

export const UserContext:any = createContext({
    user:null,
    isLoading: true,
    error: null
}
)

export const UserContextProvider = ({children}:any) => {
    const [ user, isLoading, error ] = useAuthState(auth);

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