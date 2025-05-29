import { Link } from "react-router-dom";
import InputField from "../InputField";
import { useRef } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contextos/contextprovider";
import { useState } from "react";

function register() {
  const nombreRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const fotoPerfilRef = useRef();

  const [passwordErr, setPasswordErr] = useState([]);
  const [nombreErr, setNombreErr] = useState([]);
  const [emailErr, setEmailErr] = useState([]);
  const [fotoErr, setFotoErr] = useState([]);

  const {setUser, setToken} = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();

    console.log(ev.target[4].files[0]);

    if(confirmPasswordRef.current.value != passwordRef.current.value){
      setPasswordErr(["Las contraseñas no coinciden."]);
    }else{
      var formData = new FormData();

      formData.append("nombre", nombreRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);
      if(ev.target[4].files[0] != undefined){
        formData.append("fotoPerfil", ev.target[4].files[0]);
      }

      console.log(formData);

      axiosClient.post("/register", formData).then(({data}) => {
        setUser(data.user);
        setToken(data.token)
      }).catch(err => {
        // Gestión de errores y muestreo de los mismos.
        const response = err.response;
        if(response && response.status === 422){
          // Error en la contraseña
          setPasswordErr([]);
          if(response.data.errors.password != null){
            setPasswordErr(response.data.errors.password);
          }

          // Error en el nombre de usuario
          setNombreErr([]);
          if(response.data.errors.nombre!= null){
            setNombreErr(response.data.errors.nombre);
          }

          // Error en el email de usuario
          setEmailErr([]);
          if(response.data.errors.email!= null){
            setEmailErr(response.data.errors.email);
          }

          // Error en la foto de perfil de usuario
          setFotoErr([]);
          if(response.data.errors.fotoPerfil!= null){
            setFotoErr(response.data.errors.fotoPerfil);
          }
        }
      })
    }
  }

  return (
    <div className="login-container">
        <h2 className="form-title">Regístrate:</h2>
        <form onSubmit={Submit} className="login-form" encType="multipart/form-data">
          {nombreErr.map(function(data) {
            return(
              <p className="formErr">{data}</p>
            )
          })}
          <InputField ref={nombreRef} type="text" placeholder="Nombre de usuario" icon="person"/>
          {emailErr.map(function(data) {
            return(
              <p className="formErr">{data}</p>
            )
          })}
          <InputField ref={emailRef} type="email" placeholder="Email" icon="mail"/>
          {passwordErr.map(function(data) {
            return(
              <p className="formErr">{data}</p>
            )
          })}
          <InputField ref={passwordRef} type="password" placeholder="Contraseña" icon="lock"/>
          <InputField ref={confirmPasswordRef} type="password" placeholder="Confirma tu contraseña" icon="lock"/>
          {fotoErr.map(function(data) {
            return(
              <p className="formErr">{data}</p>
            )
          })}
          <div className="fPerfilContainer">
            <label className="fPerfilContainer">Foto de perfil:</label>
            <input className="fPerfilContainer" ref={fotoPerfilRef} type="file"/>
          </div>
          <button className="login-button">Registrarse</button>
        </form>
        <p className="pEnlace">¿Ya tienes una cuenta? <Link className="enlace" to='/login'>Logeate</Link>.</p>
    </div>  
  )
}

export default register;