import { useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function UserForm(){
    const {id} = useParams();

    const [user, setUsers] = useState({
        id: null,
        nombre: '',
        email: '',
        password: '',
        biografia: '',
        foto_perfil: '',
        is_administrator: false
    });
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                setUsers(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/users', user)
            .then(() => {
                navigate('/users');
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }

    return(
    <>
      {user.id && <h1>Editar Usuario: {user.nombre}</h1>}
      {!user.id && <h1>Crear Usuario:</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form className="login-container" onSubmit={onSubmit}>
            <input value={user.nombre} onChange={ev => setUsers({...user, nombre: ev.target.value})} placeholder="Nombre"/>
            <hr></hr>
            <input value={user.email} onChange={ev => setUsers({...user, email: ev.target.value})} placeholder="Email"/>
            <hr></hr>
            <input type="password" onChange={ev => setUsers({...user, password: ev.target.value})} placeholder="Password"/>
            <hr></hr>
            <textarea rows="8" cols="30" value={user.biografia} onChange={ev => setUsers({...user, biografia: ev.target.value})} placeholder="Biografia"/>
            <hr></hr>
            <label>Foto de perfil:</label>
            <input type="file" value={user.foto_perfil} onChange={ev => setUsers({...user, foto_perfil: ev.target.value})}/>
            <hr></hr>
            <label>Administrador: </label>
            <input type="checkbox" checked={user.is_administrator} onChange={ev => setUsers({...user, is_administrator: ev.target.checked})}/>
            <hr></hr>
            <button className="btn">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}