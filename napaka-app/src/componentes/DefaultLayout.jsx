import { Outlet } from "react-router-dom";
import { useStateContext } from "../contextos/contextprovider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axiosClient";

function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext();    
    
    if(!token){
        return <Navigate to={'/login'}/>
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get('/logout').
        then(({}) => {
            setUser(null)
            setToken(null)
        })
    };

    useEffect(() => {
        axiosClient.get("/user").
        then(({data}) => {
            setUser(data)
        })
    },[])

    return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="divHeader">
                        
                    </div>
                    <div className="divUserInfo">
                        {user.nombre}
                        <a href="#" onClick={onLogout} className="btn btnLogout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )   
}

export default DefaultLayout;