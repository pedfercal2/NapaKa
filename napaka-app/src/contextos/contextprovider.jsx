import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    logo: null,
    allUsers: null,
    setUser: () => {},
    setToken: () => {},
    setLogo: () => {},
    setAllUsers: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [logo, setLogo] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            logo,
            allUsers,
            setUser,
            setToken,
            setLogo,
            setAllUsers,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)