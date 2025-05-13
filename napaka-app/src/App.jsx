

import { BrowserRouter } from "react-router-dom"
import Navegacion from "./componentes/estructura/Navegacion"
import Contenido from "./componentes/estructura/Contenido"
import ProveedorLibros from "./contextos/ProveedorLibros"



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navegacion />
        <ProveedorLibros>
          <Contenido />
        </ProveedorLibros>
      </BrowserRouter>
    </>
  )
}

export default App
