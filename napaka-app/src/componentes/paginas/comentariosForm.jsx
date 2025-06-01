import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

export default function ComentariosForm(){
    const {id} = useParams();

    const user_idRef = useRef();
    const post_idRef = useRef();
    const multimediaRef = useRef();
    const textoRef = useRef();

    const [user_idErr,setUserIdErr] = useState([]);
    const [post_idErr,setPostIdErr] = useState([]);
    const [multimediaErr, setMultimediaErr] = useState([]);
    const [textoErr, setTextoErr] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState([]);
    const {user, token, logo, setUser, setToken} = useStateContext(); 
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    // Control de si se edita poner los datos del comentario en el form (podria haberlo hecho mediante variable de contexto pero bueno)
    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/comentario/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data);
                user_idRef.current.value = data.data.user_id;
                post_idRef.current.value = data.data.post_id;
                textoRef.current.value = data.data.texto;
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
        formData.append("texto", textoRef.current.value);
        if(ev.target[2].files[0] != undefined){
            formData.append("multimedia", ev.target[2].files[0]);
        }

        // Control de si edito o creo nuevo
        if(id){
            formData.append("id", id);

            // Para editar uso metodo POST por un problema conocido de laravel en peticiones PUT con FORMDATA. No he visto otra solución al problema
            axiosClient.post("/comentario/editar", formData).then(({data}) => {
                alert("Comentario editado correctamente.");
                navigate('/comentarios'); 
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setUserIdErr([]);
                    setPostIdErr([]);
                    
                    if(response.data.errors.user_id != null){
                        setUserIdErr(response.data.errors.user_id);
                    }

                    if(response.data.errors.post_id != null){
                        setPostIdErr(response.data.errors.post_id);
                    }

                    setTextoErr([]);
                    if(response.data.errors.texto!= null){
                        setTextoErr(response.data.errors.texto);
                    }

                    setMultimediaErr([]);
                    if(response.data.errors.multimedia!= null){
                        setMultimediaErr(response.data.errors.multimedia);
                    }
                    setErrorGeneral([]);
                    if(response.data.errors.error){
                        setErrorGeneral(response.data.errors.error);
                    }
                }
            })
        }else{
            console.log(formData);
            // Creación de nuevo elemento
            axiosClient.post("/comentario", formData).then(({data}) => {
                alert("Comentario creado correctamente.");
                navigate('/comentarios')
                
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setUserIdErr([]);
                    setPostIdErr([]);
                    
                    if(response.data.errors.user_id != null){
                        setUserIdErr(response.data.errors.user_id);
                    }

                    if(response.data.errors.post_id != null){
                        setPostIdErr(response.data.errors.post_id);
                    }

                    setTextoErr([]);
                    if(response.data.errors.texto!= null){
                        setTextoErr(response.data.errors.texto);
                    }

                    setMultimediaErr([]);
                    if(response.data.errors.multimedia!= null){
                        setMultimediaErr(response.data.errors.multimedia);
                    }

                    setErrorGeneral([]);
                    if(response.data.errors.error){
                        setErrorGeneral(response.data.errors.error);
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
        {id && <h1 className="form-admin-title">Editar Comentario: {id}</h1>}
        {!id && <h1 className="form-admin-title">Crear Comentario</h1>}
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
            <div className="input-wrapper d-block">
                {post_idErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={post_idRef} placeholder="post_id"/>
            </div>
            <div className="input-wrapper">
                {multimediaErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="input-wrapper">
                    <label className="label-form-admin">Multimedia:</label>
                </div>

                <input className="label-form-admin" type="file" ref={multimediaRef}></input>

                {textoErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <textarea className="input-text-area" ref={textoRef} placeholder="Texto"/>
            </div>
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}