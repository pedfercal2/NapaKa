import { Link } from "react-router-dom";
import InputField from "../InputField";
import { useRef } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contextos/contextprovider";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {user, setUser, setToken} = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post("/login", payload).then(({data}) => {
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
        <h2 className="form-title">Entra a tu cuenta:</h2>
        <form onSubmit={Submit} className="login-form">
            <InputField ref={emailRef} type="email" placeholder="Email" icon="mail"/>
            <InputField ref={passwordRef} type="password" placeholder="Contraseña" icon="lock"/>
            <a href="#" className="forgot-pass-link">¿Has olvidado tu contraseña?</a>
            <button className="btn login-button">Entrar</button>
        </form>
        <p className="signup-text">¿No tienes una cuenta? <Link to="/register">Crea una nueva.</Link></p>
    </div>  
  )
}

export default Login;