import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function seguidos(){
    const [seguidos, setSeguidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token, logo, setUser, setToken} = useStateContext(); 

    if(!token){
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        getSeguidos();
    }, [])

    const onDeleteClick = seguido => {
        if (!window.confirm("¿Estás seguro de querer eliminar este seguido?")) {
          return
        }
        axiosClient.delete(`/seguido/${seguido.id}`)
          .then(() => {
            getSeguidos()
          })
      }

    const getSeguidos = () => {
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/seguidos/ver', data)
        .then(({data}) => {
            setLoading(false)
            console.log(data);
            setSeguidos(data.data)
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
                <h1 className="titulo-admin-form m-0">Seguidos</h1>
                <Link to="/seguidos/new" className="admin-wrap-nuevo">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla">ID</th>
              <th className="celda-admin-tabla">Id_seguido</th>
              <th className="celda-admin-tabla">Id_usuario</th>
              <th className="celda-admin-tabla">Is_bloqueado</th>
              <th className="celda-admin-tabla">Is_silenciado</th>
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
                {seguidos.map(s => {
                  return(
                  <tr key={s.id}>
                    <td className="celda-admin-tabla">{s.id}</td>
                    <td className="celda-admin-tabla">{s.id_seguido}</td>
                    <td className="celda-admin-tabla">{s.id_usuario}</td>
                    <td className="celda-admin-tabla">{s.is_bloqueado}</td>
                    <td className="celda-admin-tabla">{s.is_silenciado}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit " to={'/seguido/' + s.id}>Edit</Link>
                        <a className="btn-delete pointer-hand" onClick={ev => onDeleteClick(s)}>Delete</a>
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

export default seguidos;