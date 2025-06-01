import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function posts(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token,logo, setUser, setToken} = useStateContext(); 

    if(!token){
        return <Navigate to={'/login'}/>
    }
    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }
    
    // Al cargar la vista pido los posts al servidor
    useEffect(() => {
        getPosts();
    }, [])

    // Función encargada de gestionar el borrado de posts
    const onDeleteClick = post => {
        if (!window.confirm("¿Estás seguro de querer eliminar este post?")) {
          return
        }
        axiosClient.delete(`/post/${post.id}`)
          .then(() => {
            getPosts()
          })
      }

    // Función encaragda de gestionar el pedir los posts al servidor y prepararlos para el muestreo
    const getPosts = () => {
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/posts/ver', data)
        .then(({data}) => {
            setLoading(false)
            console.log(data);
            if(data.data.multimedia == null){
                data.data.multimedia = "no";
            }
            setPosts(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    // Si el usuario es administrador muestro datos
    if(user.is_administrator===1){
        return(
        <div className="container selector-admin">
            <SelectorAdministrar></SelectorAdministrar>
            <div className="titulo-container-admin-table d-flex">
                <h1 className="titulo-admin-form m-0">Posts</h1>
                <Link to="/posts/new" className="admin-wrap-nuevo m-0">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla">ID</th>
              <th className="celda-admin-tabla">User_id</th>
              <th className="celda-admin-tabla">Multimedia</th>
              <th className="celda-admin-tabla">Texto</th>
              <th className="celda-admin-tabla">Acciones</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center celda-admin-tabla">
                  Cargando...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
                {posts.map(p => {
                  return(
                  <tr key={p.id}>
                    <td className="celda-admin-tabla">{p.id}</td>
                    <td className="celda-admin-tabla">{p.user_id}</td>
                    <td className="celda-admin-tabla"><img className="img-admin" src={p.multimedia} alt=""></img></td>
                    <td className="celda-admin-tabla">{p.texto}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit " to={'/post/' + p.id}>Edit</Link>
                        <a className="btn-delete pointer-hand" onClick={ev => onDeleteClick(p)}>Delete</a>
                  </td>
                </tr>)
                }
              )}
              </tbody>
            }
          </table>
        </div>
    )
    }else{
      return(
        <>{loading &&
              <p>Cargando...</p>
            }{!loading &&
              <p>No eres administrador, pillín</p>}</>
      )
    }
}

export default posts;