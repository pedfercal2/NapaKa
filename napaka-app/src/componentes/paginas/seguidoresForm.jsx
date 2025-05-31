import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function SeguidoresForm(){
    const {id} = useParams();

    const id_seguidorRef = useRef();
    const id_usuarioRef = useRef();

    const [id_seguidorErr,setId_SeguidorErr] = useState([]);
    const [id_usuarioErr, setId_UsuarioErr] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState([]);
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // Si se edita se ponen los datos del elemento en el form
    if(id){
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/seguidor/${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data);
                id_seguidorRef.current.value = data.data.id_seguidor;
                id_usuarioRef.current.value = data.data.id_usuario;
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
        formData.append("id_seguidor", id_seguidorRef.current.value);
        formData.append("id_usuario", id_usuarioRef.current.value);

        // Control de si edito o creo nuevo
        if(id){
            formData.append("id", id);

            // Para editar uso metodo POST por un problema conocido de laravel en peticiones PUT con FORMDATA. No he visto otra solución al problema
            axiosClient.post("/seguidor/editar", formData).then(({data}) => {
                alert("Seguidor editado correctamente.");
                navigate('/seguidores'); 
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setId_SeguidorErr([]);
                    setErrorGeneral([]);
                    setId_UsuarioErr([]);
                    if(response.data.errors.id_seguido != null){
                        setId_SeguidorErr(response.data.errors.id_seguidor);
                    }

                    if(response.data.errors.id_usuario != null){
                        setId_UsuarioErr(response.data.errors.id_usuario);
                    }

                    if(response.data.errors.error){
                        setErrorGeneral(response.data.errors.error);
                    }
                }
            })
        }else{
            // Creación de nuevo elemento
            axiosClient.post("/seguidor", formData).then(({data}) => {
                alert("Seguidor creado correctamente.");
                navigate('/seguidores')
            }).catch(err => {
                // Gestión de errores y muestreo de los mismos.
                const response = err.response;
                if(response && response.status === 422){
                    setId_SeguidorErr([]);
                    setErrorGeneral([]);
                    setId_UsuarioErr([]);

                    if(response.data.errors.id_seguidor != null){
                        setId_SeguidorErr(response.data.errors.id_seguidor);
                    }

                    if(response.data.errors.id_usuario != null){
                        setId_UsuarioErr(response.data.errors.id_usuario);
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
        {id && <h1 className="form-admin-title">Editar Seguidor: {id}</h1>}
        {!id && <h1 className="form-admin-title">Crear Seguidor</h1>}
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
                {id_seguidorErr.map(function(data) {
                    return(
                        <p className="formErr">{data}</p>
                    )}
                )}
              <input className="input-form-admin" ref={id_seguidorRef} placeholder="id_seguidor"/>
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
            <button className="login-button">Guardar</button>
          </form>
        )}
      </div>
    </>
    )
}