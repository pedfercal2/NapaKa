import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import { Navigate } from "react-router-dom";

function Inicio(){
  const [loading, setLoading] = useState(true);
    const {user, token, logo,allUsers, setUser, setToken, setLogo, setAllUsers} = useStateContext();
    const [posts, setPosts] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState([]);
    const [postsACargarSeguidos, setPostsACargarSeguidos] = useState([]);
    const [postsACargarMios, setPostsACargarMios] = useState([]);
    const [misPosts, setMisPosts] = useState([]);

    useEffect(() => {
        getIndex();
    }, [])

    const iniciar = () => {
      console.log("CLICKED");
      getIndex();
    }
    // Función encargada de cargar todos los datos necesarios para la correcta funcionalidad de la app
    const getIndex = () => {
      const data = {
          token: token
      };
      
      axiosClient.post('/index', data)
      .then(({data}) => {
        setLoading(false)
        console.log(data);
        // Tratado de todos los datos
        setAllUsers(data.users)
        setLogo(data.logo);
        setUser(data.user);
        setPosts(data.misPosts);
        
        /*setSeguidores(data.seguidores);
        setSeguidos(data.seguidos);
        setBloqueados(data.bloqueados);
        setSilenciados(data.silenciados);
        setMisPosts(data.misPosts);*/
      }).catch(() =>{
        setLoading(false);
      })
    }

    return (
        <>
        {loading &&
          <p>Cargando...</p>
        }
        {!loading &&
        <div className="container contenerdor-main">
          <div className="row">
            <div className="col-12 d-block contenedor-inicio-logo">
              <h1 className="titulo">NapaKa</h1>
              <img className="logo-main" src={logo}></img>
            </div>
          </div>
          {/* prueba
            misPosts.map(p => {
              return(
                <div className="pruebanso">
                  <p key={p.id}></p>
                  <p>PRUEBA</p>
                  <img src={p.multimedia}></img>
                  <p>{p.texto}</p>
                </div>
              )
          })*/}
        </div>
        }  
        </>
    )
}

export default Inicio;