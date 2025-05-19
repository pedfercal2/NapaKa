

import { BrowserRouter } from "react-router-dom"
import Navegacion from "./componentes/estructura/Navegacion"
import Contenido from "./componentes/estructura/Contenido"
import ProveedorLibros from "./contextos/ProveedorLibros"
import InputField from "./componentes/InputField"

/*
  <>
      <BrowserRouter>
        <Navegacion />
        <ProveedorLibros>
          <Contenido />
        </ProveedorLibros>
      </BrowserRouter>
    </>
*/

function App() {
  return (
    <div className="login-container">
      <h2 className="form-title">Logeate:</h2>
      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email" icon="mail"/>
        <InputField type="password" placeholder="Contraseña" icon="lock"/>
        <a href="#" className="forgot-pass-link">¿Has olvidado tu contraseña?</a>
        <button className="login-button">Entrar</button>
      </form>

      <p className="signup-text">¿No tienes una cuenta? Haz click <a href="#">aquí</a>.</p>
    </div>  
  )
}

export default App
