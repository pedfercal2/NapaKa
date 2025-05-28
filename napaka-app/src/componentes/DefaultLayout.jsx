import { Outlet } from "react-router-dom";
import { useStateContext } from "../contextos/contextprovider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

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

    if(user.is_administrator==1){
        console.log(user);
        return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="divUserInfo">
                        <Link to="/users">ADMINISTRAR</Link>
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
    }else{
        console.log(user);
        return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="divHeader">
                        <div className="divUserInfo">
                            No admin
                        {user.nombre}
                        <a href="#" onClick={onLogout} className="btn btnLogout">Logout</a>
                    </div>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    ) 
    }  
}

export default DefaultLayout;