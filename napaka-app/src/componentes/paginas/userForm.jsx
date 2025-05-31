import { useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function UserForm(){
    const {id} = useParams();

    const [user, setUsers] = useState({
        id: null,
        nombre: "",
        email: "",
        password: "",
        biografia: "",
        /*fotoPerfil: "",*/
        is_administrator: false
    });

    const [readOnly, setReadOnly] = useState(false);

    const [passwordErr, setPasswordErr] = useState([]);
    const [nombreErr, setNombreErr] = useState([]);
    const [emailErr, setEmailErr] = useState([]);
    const [fotoErr, setFotoErr] = useState([]);
    
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id){
        useEffect(()=>{
            setLoading(true);
            setReadOnly(true);
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data["nombre"]);
                setUsers({
                  ...user,
                  id: data["id"],
                  nombre: data["nombre"],
                  email: data["email"],
                  biografia: data["biografia"],
                  is_administrator: data["is_administrator"]
                });
            })
            .catch(() => {
                setLoading(false)
            })
        }, []);
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
          console.log("TIENE ID");
          
          var formData2 = new FormData();

          formData2.append("id", user.id);
          formData2.append("nombre", user.nombre);
          formData2.append("email", user.email);
          formData2.append("password", user.password);
          formData2.append("biografia", user.biografia);
          //formData2.append("fotoPerfil", ev.target[4].files[0]);

          //setUsers({...user, fotoPerfil: ev.target[4].files[0]}) 
          /*axiosClient.put(`/users/${user.id}`, user)*/
          console.log(formData2);
          axiosClient.put('/user/editar', user).then(({data}) => {
                console.log(data);
                alert("Usuario editado correctamente.");
                navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                // Error en la foto de perfil de usuario
                setFotoErr([]);
                if(response.data.errors.fotoPerfil!= null){
                  setFotoErr(response.data.errors.fotoPerfil);
                }
              }
            })
        } else {
          axiosClient.post('/users', user)
            .then(() => {
                alert("Usuario creado correctamente.");
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
      // input de foto de prifl en formulario:
      /* <input type="file" onChange={ev => setUsers({...user, fotoPerfil: ev.target.value})}/>*/
    return(
    <>
      <div className="login-container">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {user.id && <h1 className="form-title">Editar Usuario {user.nombre}:</h1>}
        {!user.id && <h1 className="form-title">Crear Usuario</h1>}
        {!loading && (
          <form className="login-form" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="input-wrapper">
              <input className="input-field" defaultValue={user.nombre} readOnly={readOnly}  onChange={ev => setUsers({...user, nombre: ev.target.value})} placeholder="Nombre"/>
            </div>
            <div className="input-wrapper">
              <input className="input-field" defaultValue={user.email} readOnly={readOnly}  onChange={ev => setUsers({...user, email: ev.target.value})} placeholder="Email"/>
            </div>
            <div className="input-wrapper">
              <input className="input-field" type="password" onChange={ev => setUsers({...user, password: ev.target.value})} placeholder="Password"/>
            </div>
            <div className="text-wrapper">
              <textarea className="input-text-area" rows="8" cols="30" value={user.biografia} onChange={ev => setUsers({...user, biografia: ev.target.value})} placeholder="Biografia"/>
            </div>
            {/*fotoErr.map(function(data) {
            return(
              <p className="formErr">{data}</p>
            )
          })*/}
            {/*<label>Foto de perfil:</label>*/}
            <div className="check-wrapper">
              <label className="admin-check-label">Administrador: </label>
              <input className="admin-check" type="checkbox" checked={user.is_administrator} onChange={ev => setUsers({...user, is_administrator: ev.target.checked})}/>
            </div>
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}