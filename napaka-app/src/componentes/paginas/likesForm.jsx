import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

export default function LikesForm(){
    const {id} = useParams();

    const user_idRef = useRef();
    const post_idRef = useRef();

    const [user_idErr,setUserIdErr] = useState([]);
    const [post_idErr, setPostIdErr] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState([]);
    const {user, token, logo, setUser, setToken} = useStateContext(); 
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    // Si se edita se ponen los datos del elemento en el form
    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/like/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data);
                user_idRef.current.value = data.data.user_id;
                post_idRef.current.value = data.data.post_id;
            })
            .catch(() => {
                setLoading(false)
            })
        }, []);
    }

    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }
    
    // Función encargada de gestionar el envío de formulario a servidor
      const onSubmit = (ev) => {
        
        ev.preventDefault();

        // Carga de datos del formulario, uso formData para gestionar archivos, si los hay
        var formData = new FormData();
        formData.append("user_id", user_idRef.current.value);
        formData.append("post_id", post_idRef.current.value);

        // Control de si edito o creo nuevo
        if(id){
            formData.append("id", id);

            // Para editar uso metodo POST por un problema conocido de laravel en peticiones PUT con FORMDATA. No he visto otra solución al problema
            axiosClient.post("/like/editar", formData).then(({data}) => {
                console.log(data);
                alert("Like editado correctamente.");
                navigate('/likes'); 
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                setUserIdErr([]);
                if(response.data.errors.user_id != null){
                    setUserIdErr(response.data.errors.user_id);
                }

                setErrorGeneral([]);
                if(response.data.errors.error){
                    setErrorGeneral(response.data.errors.error);
                }

                // Error en la foto de perfil de usuario
                setPostIdErr([]);
                if(response.data.errors.post_id != null){
                    setPostIdErr(response.data.errors.post_id);
                }
                }
            })
        }else{
            console.log(formData);
            // Creación de nuevo elemento
            axiosClient.post("/like", formData).then(({data}) => {
                alert("Like creado correctamente.");
                navigate('/likes')
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setUserIdErr([]);
                if(response.data.errors.user_id != null){
                    setUserIdErr(response.data.errors.user_id);
                }

                setErrorGeneral([]);
                if(response.data.errors.error){
                    setErrorGeneral(response.data.errors.error);
                }

                // Error en la foto de perfil de usuario
                setPostIdErr([]);
                if(response.data.errors.post_id!= null){
                    setPostIdErr(response.data.errors.post_id);
                }
                }
            })
        }
    }

    // Formulario tanto de edit como de creación
    return(
    <>
      <div className="login-container">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {id && <h1 className="form-admin-title">Editar Like con ID: {id}</h1>}
        {!id && <h1 className="form-admin-title">Crear Like</h1>}
        {!loading && (
          <form className="form-admin" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="input-wrapper d-block">
                {errorGeneral.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
            </div>
            <div className="input-wrapper d-block">
                {user_idErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={user_idRef} placeholder="user_id"/>
            </div>
            <div className="input-wrapper">
                {post_idErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="input-wrapper">
                    <input className="input-form-admin" ref={post_idRef} placeholder="post_id"/>
                </div>
            </div>
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}