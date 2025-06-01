import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

export default function UserForm(){
    const {id} = useParams();

    const nombreRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const biografiaRef = useRef();
    const fotoPerfillRef = useRef();
    const isAdminRef = useRef(false);

    /*const [user, setUsers] = useState({
        id: null,
        nombre: "",
        email: "",
        password: "",
        biografia: "",
        /*fotoPerfil: "",*/
        /*is_administrator: false
    });*/

    const [readOnly, setReadOnly] = useState(false);

    const [passwordErr, setPasswordErr] = useState([]);
    const [nombreErr, setNombreErr] = useState([]);
    const [emailErr, setEmailErr] = useState([]);
    const [biografiaErr, setBiografiaErr] = useState([]);
    const [fotoPerfilErr, setFotoPerfilErr] = useState([]);
    const [isAdminErr, setIsAdminErr] = useState([]);
    
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {logo, setToken} = useStateContext(); 

    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }

    if(id){
        useEffect(()=>{
            setLoading(true);
            setReadOnly(true);
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data["nombre"]);
                
                nombreRef.current.value = data["nombre"];
                emailRef.current.value = data["email"];
                biografiaRef.current.value = data["biografia"];
                console.log(data["is_administrator"]);
                
                if(data["is_administrator"] == 1){
                  console.log("en true");
                  isAdminRef.current.checked = true;
                }else{
                  console.log("en false");
                  isAdminRef.current.checked = false;
                }
                /*setUsers({
                  ...user,
                  id: data["id"],
                  nombre: data["nombre"],
                  email: data["email"],
                  biografia: data["biografia"],
                  is_administrator: data["is_administrator"]
                });*/
            })
            .catch(() => {
                setLoading(false)
            })
        }, []);
    }

    // Gestión de el envío de datos al servidor
    const onSubmit = ev => {
        ev.preventDefault();
        // uso formdata para poder mandar correctamente la imágen al servidor
        const formData = new FormData();
        formData.append("nombre", nombreRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("biografia", biografiaRef.current.value);
        formData.append("is_administrator", isAdminRef.current.checked);
        
        console.log(formData);

        if(ev.target[4].files[0] != undefined){
          formData.append("fotoPerfil", ev.target[4].files[0]);
        }

        if (id) {
          console.log("TIENE ID");
          setReadOnly(true);

          formData.append("id", id);

          //setUsers({...user, fotoPerfil: ev.target[4].files[0]}) 
          /*axiosClient.put(`/users/${user.id}`, user)*/

          axiosClient.post('/user/editar', formData).then(({data}) => {
                console.log(data);
                alert("Usuario editado correctamente.");
                navigate('/users');
            })
            .catch(err => {
              const response = err.response;
              if(response && response.status === 422){
                setNombreErr([]);
                if(response.data.errors.nombre != null){
                    setNombre(response.data.errors.nombre);
                }

                setEmailErr([]);
                if(response.data.errors.email!= null){
                    setEmailErr(response.data.errors.email);
                }
                
                setBiografiaErr([]);
                if(response.data.errors.biografia!= null){
                  setBiografiaErr(response.data.errors.biografia);  
                }

                setFotoPerfilErr([]);
                if(response.data.errors.foto_perfil!= null){
                    setMultimediaErr(response.data.errors.foto_perfil);
                }
              }
            })
        } else {
          axiosClient.post('/users', formData)
            .then(() => {
                alert("Usuario creado correctamente.");
                navigate('/users');
            })
            .catch(err => {
              if(response && response.status === 422){
                setNombreErr([]);
                if(response.data.errors.nombre != null){
                    setNombre(response.data.errors.nombre);
                }

                setEmailErr([]);
                if(response.data.errors.email!= null){
                    setEmailErr(response.data.errors.email);
                }
                
                setBiografiaErr([]);
                if(response.data.errors.biografia!= null){
                  setBiografiaErr(response.data.errors.biografia);  
                }

                setFotoPerfilErr([]);
                if(response.data.errors.foto_perfil!= null){
                    setMultimediaErr(response.data.errors.foto_perfil);
                }
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
        {id && <h1 className="form-admin-title">Editar El Usuario con ID: {id}</h1>}
        {!id && <h1 className="form-admin-title">Crear Usuario</h1>}
        {!loading && (
          <form className="form-admin" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="input-wrapper d-block">
                {nombreErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={nombreRef} readOnly={readOnly} placeholder="Nombre"/>
            </div>
            <div className="input-wrapper d-block">
                {emailErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={emailRef} readOnly={readOnly} placeholder="Email"/>
            </div>
            <div className="input-wrapper d-block">
                {passwordErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={passwordRef} placeholder="password"/>
            </div>
            <div className="input-wrapper">
             {biografiaErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <textarea className="input-text-area" ref={biografiaRef} placeholder="Biografia"/>
            </div>
            <div className="input-wrapper">
                {fotoPerfilErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="input-wrapper">
                    <label className="label-form-admin">Foto de perfil:</label>
                </div>
                
                <input className="label-form-admin" type="file" ref={fotoPerfillRef}></input>
            </div>
            <div className="input-wrapper">
                {isAdminErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="input-wrapper">
                    <label className="label-form-admin">Admin:</label>
                </div>
                <input className="label-form-admin" type="checkbox" ref={isAdminRef}></input>
            </div>
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}