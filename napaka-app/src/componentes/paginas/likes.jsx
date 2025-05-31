import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function likes(){
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token, setUser, setToken} = useStateContext(); 

    if(!token){
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        getLikes();
    }, [])

    const onDeleteClick = like => {
        if (!window.confirm("¿Estás seguro de querer eliminar este like?")) {
          return
        }
        axiosClient.delete(`/like/${like.id}`)
          .then(() => {
            getLikes()
          })
      }

    const getLikes = () => {
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/likes/ver', data)
        .then(({data}) => {
            setLoading(false)
            console.log(data);
            setLikes(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    if(user.is_administrator===1){
        return(
        <div className="container selector-admin">
            <SelectorAdministrar></SelectorAdministrar>
            <div className="titulo-container-admin-table d-flex">
                <h1 className="titulo-admin-form m-0">Likes</h1>
                <Link to="/likes/new" className="admin-wrap-nuevo">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla">ID</th>
              <th className="celda-admin-tabla">User_id</th>
              <th className="celda-admin-tabla">Post_id</th>
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
                {likes.map(l => {
                  return(
                  <tr key={l.id}>
                    <td className="celda-admin-tabla">{l.id}</td>
                    <td className="celda-admin-tabla">{l.user_id}</td>
                    <td className="celda-admin-tabla">{l.post_id}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit " to={'/like/' + l.id}>Edit</Link>
                        <a className="btn-delete pointer-hand" onClick={ev => onDeleteClick(l)}>Delete</a>
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
              <p>
                  Cargando...
              </p>
            }{!loading &&
              <p>No eres administrador, pillín</p>}</>
      )
    }
}

export default likes;