import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// Context provider para poder pasar datos entre diferentes elementos de forma cómoda y práctica.
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

    // Gestion de almacenado de token
    const setToken = (token) => {
        _setToken(token)
        // si a setToken se le pasa un token:
        if(token){
            // Guardo en variable de cliente local el token
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            // Borro la variable
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