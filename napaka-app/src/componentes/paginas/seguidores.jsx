import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function seguidores(){
    const [seguidores, setSeguidores] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token,logo, setUser, setToken} = useStateContext(); 

    if(!token){
        return <Navigate to={'/login'}/>
    }
    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }

    useEffect(() => {
        getSeguidores();
    }, [])

    const onDeleteClick = seguidor => {
        if (!window.confirm("¿Estás seguro de querer eliminar este seguidor?")) {
          return
        }
        axiosClient.delete(`/seguidor/${seguidor.id}`)
          .then(() => {
            getSeguidores()
          })
      }

    const getSeguidores = () => {
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/seguidores/ver', data)
        .then(({data}) => {
            setLoading(false)
            console.log(data);
            setSeguidores(data.data)
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
                <h1 className="titulo-admin-form m-0">Seguidores</h1>
                <Link to="/seguidores/new" className="admin-wrap-nuevo">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla">ID</th>
              <th className="celda-admin-tabla">Id_seguidor</th>
              <th className="celda-admin-tabla">Id_usuario</th>
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
                {seguidores.map(s => {
                  return(
                  <tr key={s.id}>
                    <td className="celda-admin-tabla">{s.id}</td>
                    <td className="celda-admin-tabla">{s.id_seguidor}</td>
                    <td className="celda-admin-tabla">{s.id_usuario}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit " to={'/seguidor/' + s.id}>Edit</Link>
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

export default seguidores;