import { Outlet } from "react-router-dom";
import { useStateContext } from "../contextos/contextprovider";
import { Navigate } from "react-router-dom";

// Layout padre de los formularios de inicio de sesión y registro
function GuestLayout(){
    const {token} = useStateContext();
    
    if(token){
        return <Navigate to={'/inicio'}/>
    }
    return(
        <div>
            <div>
            </div>
            <Outlet />
        </div>
    )
}

export default GuestLayout;