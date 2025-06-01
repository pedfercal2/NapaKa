import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";
import { Navigate } from "react-router-dom";

function users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {admin, setAdmin} = useState("SI");
    const {user, token,logo, setUser, setToken} = useStateContext(); 

    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }

    const sortList = (key, list, inverse) => {
      inverse
      ? [...list].sort((a,b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
      : [...list].sort((a,b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
    }

    if(!token){
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("¿Estás seguro de querer eliminar este usuario?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers()
          })
      }

    const getUsers = () => {
      console.log(user);
        const data = {
          user: user
        };
        setLoading(true);
        axiosClient.post('/users/ver', data)
        .then(({data}) => {
            setLoading(false)
            setUsers(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    if(user.is_administrator===1){
        return(
        <div className="container">
          <SelectorAdministrar></SelectorAdministrar>
        <div className="titulo-container-admin-table d-flex">
                <h1 className="m-0 p-0 m-8 titulo-admin-form">Usuarios</h1>
                <Link to="/users/new" className="admin-wrap-nuevo">
                    <span className="align-middle nuevo-elemento-admin-table">Nuevo...</span>
                </Link>
            </div>
          <table className="table table-hover tabla-admin">
            <thead>
            <tr>
              <th className="celda-admin-tabla col-2" onClick={function(){
                console.log(users);
                console.log("CLICK ID");
                let aux = users;
                aux = aux.sort((a,b) => (a.id > b.id ? 1 : -1));
                setUsers(aux);
                console.log(users);
              }}>ID</th>
              <th className="celda-admin-tabla col-2" onClick={function(){
                console.log("Nombre clicked");
                users.sort((a,b) => a.nombre>b.nombre);
              }}>Nombre</th>
              <th className="celda-admin-tabla col-2" onClick={function(){
                console.log("Email clicked");
                users.sort((a,b) => a.email>b.email);
              }}>Email</th>
              <th className="celda-admin-tabla col-2">Foto Perfil</th>
              <th className="celda-admin-tabla col-2" onClick={function(){
                console.log("Admin clicked");
                users.sort((a,b) => a.is_administrator>b.is_administrator);
              }}>Admin</th>
              <th className="celda-admin-tabla col-2">Acciones</th>
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
                {users.map(u =>
                {if(user.id !== u.id){
                  return(
                  <tr key={u.id}>
                    <td className="celda-admin-tabla">{u.id}</td>
                    <td className="celda-admin-tabla">{u.nombre}</td>
                    <td className="celda-admin-tabla">{u.email}</td>
                    <td className="celda-admin-tabla"><img className="img-admin" src={u.foto_perfil}></img></td>
                    <td className="celda-admin-tabla">{u.is_administrator}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                        <a className="btn-delete pointer-hand" onClick={ev => onDeleteClick(u)}>Delete</a>
                  </td>
                </tr>)
                }}
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

export default users;