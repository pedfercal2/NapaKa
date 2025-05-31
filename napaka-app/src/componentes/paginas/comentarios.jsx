import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function comentarios(){
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token, setUser, setToken} = useStateContext(); 

    if(!token){
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        getComentarios();
    }, [])

    const onDeleteClick = comentario => {
        axiosClient.delete(`/comentario/${comentario.id}`)
          .then(() => {
            getComentarios()
          })
      }

    const getComentarios = () => {
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/comentarios/ver', data)
        .then(({data}) => {
            setLoading(false)
            console.log(data);
            if(data.data.multimedia == null){
                data.data.multimedia = "no";
            }
            setComentarios(data.data)
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
                <h1 className="titulo-admin-form m-0">Comentarios</h1>
                <Link to="/comentarios/new" className="admin-wrap-nuevo m-0">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla">ID</th>
              <th className="celda-admin-tabla">User_id</th>
              <th className="celda-admin-tabla">Post_id</th>
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
                {comentarios.map(c => {
                  return(
                  <tr key={c.id}>
                    <td className="celda-admin-tabla">{c.id}</td>
                    <td className="celda-admin-tabla">{c.user_id}</td>
                    <td className="celda-admin-tabla">{c.post_id}</td>
                    <td className="celda-admin-tabla"><img className="img-admin" src={c.multimedia} alt=""></img></td>
                    <td className="celda-admin-tabla">{c.texto}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit " to={'/comentario/' + c.id}>Edit</Link>
                        <a className="btn-delete pointer-hand" onClick={ev => onDeleteClick(c)}>Delete</a>
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

export default comentarios;