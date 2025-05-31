import { useState } from "react";
import { Link } from "react-router-dom";

const SelectorAdministrar = () =>{
    return (
        <div className="d-flex selector-admin">
          <Link className="boton-selector-admin m-auto" to="/users">Usuarios</Link>
          <Link className="boton-selector-admin" to="/posts">Posts</Link>
          <Link className="boton-selector-admin" to="/likes">Likes</Link>
          <Link className="boton-selector-admin" to="/comentarios">Comentarios</Link>
          <Link className="boton-selector-admin" to="/seguidores">Seguidores</Link>
          <Link className="boton-selector-admin" to="/seguidos">Seguidos</Link>
        </div>
    )
}

export default SelectorAdministrar;