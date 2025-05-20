import { Outlet } from "react-router-dom";
import { useStateContext } from "../contextos/contextprovider";
import { Navigate } from "react-router-dom";

function DefaultLayout(){
    const {user, token} = useStateContext();
    
    if(!token){
        return <Navigate to={'/login'}/>
    }

    return(
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="divHeader">
                        Header
                    </div>
                    <div className="divUserInfo">
                        {user.name}
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