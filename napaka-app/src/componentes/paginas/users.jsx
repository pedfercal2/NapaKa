import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

function users(){
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const {user, token, setUser, setToken} = useStateContext(); 
    const {admin, setAdmin} = useState("SI");

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

     return(
        <div className="container">
        <div className="card animated fadeInDown">
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
              <h1>Users</h1>
              <Link className="btn-add" to="/users/new">Nuevo...</Link>
            </div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Foto Perfil</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
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
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td><img className="img-thumbnail border border-black p-2" src={u.foto_perfil}></img></td>
                    <td>{u.is_administrator}</td>
                    <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>)
                }}
              )}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}

export default users;