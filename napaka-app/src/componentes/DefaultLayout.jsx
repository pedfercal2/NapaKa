import { Outlet } from "react-router-dom";
import { useStateContext } from "../contextos/contextprovider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

function DefaultLayout(){
    const {user, token, logo, setUser, setToken, setLogo} = useStateContext();       
    
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
        return(
        <div id="defaultLayout">
            <div className="content">
                <header className="main-header">
                    <div className="divUserInfo">
                        <img className="logo" src={logo} alt="Logo"></img>
                        <Link className="headerLink header-text" to="/users">ADMINISTRAR</Link>
                        <img className="" src={user.foto_perfil}></img>
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
        return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="main-header container">
                        <div className="divUserInfo">
                            <img className="col-2" src={logo} alt="Logo"></img>
                            <img className="col-2" src={user.foto_perfil}></img>
                            <span className="col-2 header-text">{user.nombre}</span>
                            <a href="#" onClick={onLogout} className="col-2 header-text headerLink">Logout</a>
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