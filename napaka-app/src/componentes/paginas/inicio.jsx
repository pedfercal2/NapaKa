import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

function inicio(){
    const {user, token, logo,allUsers, setUser, setToken, setLogo, setAllUsers} = useStateContext();
    const [errorGeneral, setErrorGeneral] = useState([]);
    const [postsACargarSeguidos, setPostsACargarSeguidos] = useState([]);
    const [postsACargarMios, setPostsACargarMios] = useState([]);


    useEffect(() => {
        getIndex()
    }, [])

    // Función encargada de cargar todos los datos necesarios para la correcta funcionalidad de la app
    const getIndex = () => {
      const data = {
          token: token
      };
      
      axiosClient.post('/index', data)
      .then(({data}) => {
        console.log(data);
        // Tratado de todos los datos
        setAllUsers(data.users)
        setLogo(data.logo);
        setUser(data.user);
        console.log(data.infoSeguidos);
        setPostsACargarSeguidos(data.infoSeguidos);
        
        console.log(postsACargarSeguidos)
        
        /*setSeguidores(data.seguidores);
        setSeguidos(data.seguidos);
        setBloqueados(data.bloqueados);
        setSilenciados(data.silenciados);
        setMisPosts(data.misPosts);*/
      })
    }

    return (
        <>
          {/*postsACargar.map(p => {

          })*/}     
        </>
    )
}

export default inicio;