import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contextos/contextprovider";

export default function SeguidosForm(){
    const {id} = useParams();

    const id_seguidoRef = useRef();
    const id_usuarioRef = useRef();
    const is_silenciadoRef = useRef();
    const is_bloqueadoRef = useRef();

    const [id_seguidoErr,setId_SeguidoErr] = useState([]);
    const [id_usuarioErr, setId_UsuarioErr] = useState([]);
    const [is_bloqueadoErr,setIs_BloqueadoErr] = useState([]);
    const [is_silenciadoErr, setIs_SilenciadoErr] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState([]);
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {user, token,logo, setUser, setToken} = useStateContext(); 

    if(!logo){
        return <Navigate to='/inicio'></Navigate>
    }

    // Si se edita se ponen los datos del elemento en el form
    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/seguido/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data);
                id_seguidoRef.current.value = data.data.id_seguido;
                id_usuarioRef.current.value = data.data.id_usuario;
                is_silenciadoRef.current.checked = data.data.is_silenciado;
                is_bloqueadoRef.current.checked = data.data.is_bloqueado;
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
        formData.append("id_seguido", id_seguidoRef.current.value);
        formData.append("id_usuario", id_usuarioRef.current.value);
        formData.append("is_silenciado", is_silenciadoRef.current.checked);
        formData.append("is_bloqueado", is_bloqueadoRef.current.checked);

        // Control de si edito o creo nuevo
        if(id){
            formData.append("id", id);

            // Para editar uso metodo POST por un problema conocido de laravel en peticiones PUT con FORMDATA. No he visto otra solución al problema
            axiosClient.post("/seguido/editar", formData).then(({data}) => {
                alert("Seguido editado correctamente.");
                navigate('/seguidos'); 
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setId_SeguidoErr([]);
                    setErrorGeneral([]);
                    setId_UsuarioErr([]);
                    setIs_BloqueadoErr([]);
                    setIs_SilenciadoErr([]);

                    if(response.data.errors.id_seguido != null){
                        setId_SeguidoErr(response.data.errors.id_seguido);
                    }

                    if(response.data.errors.id_usuario != null){
                        setId_UsuarioErr(response.data.errors.id_usuario);
                    }

                    if(response.data.errors.is_silenciado != null){
                        setIs_SilenciadoErr(response.data.errors.is_silenciado);
                    }

                    if(response.data.errors.is_bloqueado != null){
                        setIs_BloqueadoErr(response.data.errors.is_bloqueado);
                    }

                    if(response.data.errors.error){
                        setErrorGeneral(response.data.errors.error);
                    }
                }
            })
        }else{
            // Creación de nuevo elemento
            axiosClient.post("/seguido", formData).then(({data}) => {
                alert("Seguido creado correctamente.");
                navigate('/seguidos')
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setId_SeguidoErr([]);
                    setErrorGeneral([]);
                    setId_UsuarioErr([]);
                    setIs_BloqueadoErr([]);
                    setIs_SilenciadoErr([]);

                    if(response.data.errors.id_seguido != null){
                        setId_SeguidoErr(response.data.errors.id_seguido);
                    }

                    if(response.data.errors.id_usuario != null){
                        setId_UsuarioErr(response.data.errors.id_usuario);
                    }

                    if(response.data.errors.is_silenciado != null){
                        setIs_SilenciadoErr(response.data.errors.is_silenciado);
                    }

                    if(response.data.errors.is_bloqueado != null){
                        setIs_BloqueadoErr(response.data.errors.is_bloqueado);
                    }

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
        {id && <h1 className="form-admin-title">Editar Seguido: {id}</h1>}
        {!id && <h1 className="form-admin-title">Crear Seguido</h1>}
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
                {id_seguidoErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={id_seguidoRef} placeholder="id_seguido"/>
            </div>
            <div className="input-wrapper">
                {id_usuarioErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="input-wrapper">
                    <input className="input-form-admin" ref={id_usuarioRef} placeholder="id_usuario"/>
                </div>
            </div>
            <div className="input-wrapper">
                {is_silenciadoErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="check-wrapper">
                    <label className="admin-check-label">Silenciado: </label>
                    <input className="admin-check" type="checkbox" ref={is_silenciadoRef}/>
                </div>
            </div>
            <div className="input-wrapper">
                {is_bloqueadoErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
                <div className="check-wrapper">
                    <label className="admin-check-label">Bloqueado: </label>
                    <input className="admin-check" type="checkbox" ref={is_bloqueadoRef}/>
                </div>
            </div>
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}