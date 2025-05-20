import { Link } from "react-router-dom";
import InputField from "../InputField"

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const Submit = (ev) =>{
    ev.prentDefault();
  }

  return (
    <div className="login-container">
        <h2 className="form-title">Entra a tu cuenta:</h2>
        <form onSubmit={Submit} className="login-form">
            <InputField type="email" placeholder="Email" icon="mail"/>
            <InputField type="password" placeholder="Contraseña" icon="lock"/>
            <a href="#" className="forgot-pass-link">¿Has olvidado tu contraseña?</a>
            <button className="btn login-button">Entrar</button>
        </form>
        <p className="signup-text">¿No tienes una cuenta? <Link to="/register">Crea una nueva.</Link></p>
    </div>  
  )
}

export default Login;