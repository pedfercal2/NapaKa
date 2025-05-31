import { Link } from "react-router-dom";
import InputField from "../InputField";
import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contextos/contextprovider";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {user, setUser, setToken} = useStateContext();
  const [errores, setErrores] = useState([]);

  const Submit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post("/login", payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setErrores(data.message);
      console.log(data);
      if(user && token){
        return (
          <Navigate to='/inicio'/>
        )
      }
    }).catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        setErrores(response.data.errors);
        console.log(response.data.errors);
      }
      setErrores(response.data.errors);
      console.log(errores);
    })
  }

  return (
    <div className="login-container">
        <h2 className="form-title">Entra a tu cuenta:</h2>
        <form onSubmit={Submit} className="login-form">
            <p className="formErr">{errores}</p>
            <InputField ref={emailRef} type="email" placeholder="Email" icon="mail"/>
            <InputField ref={passwordRef} type="password" placeholder="Contraseña" icon="lock"/>
            <button className="btn login-button">Entrar</button>
        </form>
        <p className="signup-text pEnlace">¿No tienes una cuenta? <Link className="enlace" to="/register">Crea una nueva.</Link></p>
    </div>  
  )
}

export default Login;