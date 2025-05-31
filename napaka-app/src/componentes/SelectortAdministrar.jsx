import { useState } from "react";
import { Link } from "react-router-dom";

const SelectorAdministrar = () =>{
    return (
        <div className="d-flex selector-admin">
          <Link className="boton m-auto" to="/users">Usuarios</Link>
          <Link className="boton m-auto" to="/posts">Posts</Link>
          <Link className="boton m-auto">Likes</Link>
          <Link className="boton m-auto">Comentarios</Link>
          <Link className="boton m-auto">Seguidores</Link>
          <Link className="boton m-auto">Seguidos</Link>
        </div>
    )
}

export default SelectorAdministrar;