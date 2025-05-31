import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";
import SelectorAdministrar from "../SelectortAdministrar";

function posts(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user, token, setUser, setToken} = useStateContext(); 
    const {admin, setAdmin} = useState("SI");

    if(!token){
        return <Navigate to={'/login'}/>
    }

    useEffect(() => {
        getPosts();
    }, [])

    const onDeleteClick = post => {
        if (!window.confirm("¿Estás seguro de querer eliminar este post?")) {
          return
        }
        axiosClient.delete(`/post/${post.id}`)
          .then(() => {
            getPosts()
          })
      }

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

    if(user.is_administrator===1){
        return(
        <div className="container selector-admin">
            <SelectorAdministrar></SelectorAdministrar>
            <div className="div-tabla">
                <div className="row nuevo-elemento-form p-0 m-0">
                <h1 className="col-10 m-0 p-0 tititulo-form">Posts</h1>
                <Link className="col-2 align-middle m-0 p-0 btn-edit" to="/posts/new">Nuevo...</Link>
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
                    <td className="celda-admin-tabla"><img className="img-thumbnail border border-black p-2" src={p.multimedia}></img></td>
                    <td className="celda-admin-tabla">{p.texto}</td>
                    <td className="celda-admin-tabla">
                        <Link className="btn-edit" to={'/post/' + p.id}>Edit</Link>
                        <a className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</a>
                  </td>
                </tr>)
                }
              )}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
    }else{
      return(
        <>{loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando...
                </td>
              </tr>
              </tbody>
            }{!loading &&
              <p>No eres administrador, pillín</p>}</>
      )
    }
}

export default posts;