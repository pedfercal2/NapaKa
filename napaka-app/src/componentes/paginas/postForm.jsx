import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function PostForm(){
    const {id} = useParams();

    const user_idRef = useRef();
    const multimediaRef = useRef();
    const textoRef = useRef();

    const [user_idErr,setUserIdErr] = useState([]);
    const [multimediaErr, setMultimediaErr] = useState([]);
    const [textoErr, setTextoErr] = useState([]);

    const [readOnly, setReadOnly] = useState(false);
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    // Control de si se edita poner los datos del usuario en el form (podria haberlo hecho mediante variable de contexto pero bueno)
    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/post/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data.user_id);
                user_idRef.current.value = data.user_id;
                textoRef.current.value = data.texto;
            })
            .catch(() => {
                setLoading(false)
            })
        }, []);
    }
    
    // Función encargada de gestionar el envío de formulario a servidor
      const onSubmit = (ev) => {
        
        ev.preventDefault();

        // Carga de datos del formulario, uso formData para gestionar archivos, si los hay
        var formData = new FormData();
        formData.append("user_id", user_idRef.current.value);
        formData.append("texto", textoRef.current.value);
        if(ev.target[1].files[0] != undefined){
            formData.append("multimedia", ev.target[1].files[0]);
        }

        // Control de si edito o creo nuevo
        if(id){
            formData.append("id", id);

            // Para editar uso metodo POST por un problema conocido de laravel en peticiones PUT con FORMDATA. No he visto otra solución al problema
            axiosClient.post("/post/editar", formData).then(({data}) => {
                console.log(data);
                alert("Post editado correctamente.");
                navigate('/posts'); 
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                setUserIdErr([]);
                if(response.data.errors.user_id != null){
                    setUserIdErr(response.data.errors.user_id);
                }

                setTextoErr([]);
                if(response.data.errors.texto!= null){
                    setTextoErr(response.data.errors.texto);
                }

                // Error en la foto de perfil de usuario
                setMultimediaErr([]);
                if(response.data.errors.multimedia!= null){
                    setMultimediaErr(response.data.errors.multimedia);
                }
                }
            })
        }else{
            console.log(formData);
            // Creación de nuevo elemento
            axiosClient.post("/post", formData).then(({data}) => {
                alert("Post creado correctamente.");
                console.log(data);
                navigate('/posts')
                
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                setUserIdErr([]);
                if(response.data.errors.user_id != null){
                    setUserIdErr(response.data.errors.user_id);
                }

                setTextoErr([]);
                if(response.data.errors.texto!= null){
                    setTextoErr(response.data.errors.texto);
                }

                // Error en la foto de perfil de usuario
                setMultimediaErr([]);
                if(response.data.errors.multimedia!= null){
                    setMultimediaErr(response.data.errors.multimedia);
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
        {id && <h1 className="form-title">Editar Post {id}:</h1>}
        {!id && <h1 className="form-title">Crear Post</h1>}
        {!loading && (
          <form className="form-admin" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="input-wrapper d-block">
                {user_idErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={user_idRef} placeholder="user_id"/>
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