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
                    <header className="d-flex">
                        <div className="main-header">
                            <div className="divUserInfo d-flex">
                                <div className="logo-container d-flex">
                                    <div className="logo-inside-container d-flex">
                                        <Link to="/inicio"><img className="logo" src={logo} alt="Logo"></img></Link>
                                    </div>
                                    <div className="admin-container">
                                        <Link className="headerLink header-text" to="/users">ADMINISTRAR</Link>
                                    </div>
                                </div>
                                <div className="header-right-container">
                                    <div className="d-flex m-auto user-header-container">
                                        <img className="logo m-auto mr-0" src={user.foto_perfil}></img>
                                        <span className="header-text m-auto ml-0">{user.nombre}</span>
                                    </div>
                                    <div className="logout-container">
                                        <a href="#" onClick={onLogout} className="header-text headerLink m-auto">Logout</a>
                                    </div>
                                </div>
                            </div>
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
                    <header className="d-flex">
                        <div className="main-header">
                            <div className="divUserInfo d-flex">
                                <div className="logo-container">
                                    <Link to="/inicio"><img className="logo" src={logo} alt="Logo"></img></Link>
                                </div>
                                <div className="header-right-container">
                                    <div className="d-flex m-auto user-header-container">
                                        <img className="logo m-auto mr-0" src={user.foto_perfil}></img>
                                        <span className="header-text m-auto ml-0">{user.nombre}</span>
                                    </div>
                                    <div className="logout-container">
                                        <a href="#" onClick={onLogout} className="header-text headerLink m-auto">Logout</a>
                                    </div>
                                </div>
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