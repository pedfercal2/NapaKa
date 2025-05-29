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
                <header className="main-header">
                    <div className="divUserInfo">
                        <Link className="headerLink header-text" to="/users">ADMINISTRAR</Link>
                    <img src={user.foto_perfil}></img>
                    <span className="header-text">{user.nombre}</span>
                    <a href="#" onClick={onLogout} className="header-text headerLink">Logout</a>
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
                        <img className="border border-black p-2 img-thumbnail" src={user.foto_perfil}></img>
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