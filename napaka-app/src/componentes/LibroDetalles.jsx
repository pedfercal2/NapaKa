import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { contextoBiblioteca } from "../contextos/ProveedorLibros";

const LibroDetalles = (props) => {
  const { id, titulo, autor, portada, completado, sinopsis } = props.libroBuscado;
  const { borrarLibro } = useContext(contextoBiblioteca);
 /* let id=0;
  let titulo="por defecto";
  let autor ="por defecto";
  let portada ="por defecto";
  let completado = false;
  let sinopsis ="por defecto";*/
 
  return (
    <Fragment>
      <article className='libro-detalle'>
        <img
          className='libro-detalle__portada'
          src={portada ? portada : sin_portada}
          alt={titulo ? titulo : "No se ha especificado título."}
        ></img>
        <div className='libro-detalle__info'>
          <div>
                       <span className='libro-detalle__titulo'>
              {titulo ? titulo : "No se ha especificado título."}
            </span>
          </div>
          <div className='libro-detalle__autor'>
            {autor ? autor : "No se ha especificado autor."}
          </div>
          <div className='libro-detalle__sinopsis'>
            {sinopsis ? sinopsis : "No se ha especificado sinopsis."}
          </div>
          <input
            type='button'
            value='Eliminar de la biblioteca'
            className='boton boton--cancelar'
            onClick={(evento) => {
              confirm(`¿Desea eliminar ${
                titulo ? titulo : "Sin título"
              } de su biblioteca?`
              ) && borrarLibro(id);
            }}
          />
          <Link to='/' >
            <input
                type='button'
                value='< Atrás'
                className='boton boton--volver'
            />
          </Link>
        </div>
      </article>
    </Fragment>
  );
};

export default LibroDetalles;
