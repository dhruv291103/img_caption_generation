import React, { createContext, useContext, useEffect, useState } from 'react'
export const myContext = createContext();

// context API for Register and Login things
function Auth({children}) {
    const[token, setToken] = useState(null);
    const[user, setUser] = useState(null);
    const[isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token_val = localStorage.getItem("token");
        const user_val = JSON.parse(localStorage.getItem("user"));
        if(token_val){
            setToken(token)
            setIsLoggedIn(true);
        }

        if(user_val){
            setUser(user);
        }
        }, [])
    

    const storeTokenInLocalStorage = (serverToken)=>{
        setIsLoggedIn(true);
        return localStorage.setItem("token", serverToken);
    }

    const storeUserInformation = (userInfo)=>{
        return localStorage.setItem("user", userInfo);
    }

    return (
        <myContext.Provider value={{isLoggedIn, storeTokenInLocalStorage, storeUserInformation, setIsLoggedIn}}>
            {children}
        </myContext.Provider>
    )
    }





// custom hook for the token storage in local storage
export function useAuth(){
    const context = useContext(myContext);
    if(!context){
        throw new error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export default Auth