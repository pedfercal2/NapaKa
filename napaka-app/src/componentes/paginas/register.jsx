import { Link } from "react-router-dom";
import InputField from "../InputField";
import { useRef } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contextos/contextprovider";

function register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const {setUser, setToken} = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    }
    axiosClient.post("/register", payload).then((data) => {
      console.log(data);
      setUser(data.user);
      setToken(data.token)
    }).catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        console.log(response.data.errors);
      }
      console.log(response);
    })
  }

  return (
    <div className="login-container">
        <h2 className="form-title">Regístrate:</h2>
        <form onSubmit={Submit} className="login-form">
            <InputField ref={nameRef} type="text" placeholder="Nombre de usuario" icon="person"/>
            <InputField ref={emailRef} type="email" placeholder="Email" icon="mail"/>
            <InputField ref={passwordRef} type="password" placeholder="Contraseña" icon="lock"/>
            <InputField ref={confirmPasswordRef} type="password" placeholder="Confirma tu contraseña" icon="lock"/>
            <button className="login-button">Registrarse</button>
        </form>
        <p className="signup-text">¿Ya tienes una cuenta? <Link to='/login'>Logeate</Link>.</p>
    </div>  
  )
}

export default register;