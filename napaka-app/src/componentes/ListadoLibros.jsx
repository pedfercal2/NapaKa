import { Fragment, Router } from "react";
import Libro from "./Libro";
import { Link } from "react-router-dom";
import { contextoBiblioteca } from "../contextos/ProveedorLibros";
import { useContext } from "react";
function ListadoLibros (){
    const {
        biblioteca,
        inicializarBiblioteca,
    } = useContext(contextoBiblioteca);
    //inicializarBiblioteca();
    return(
        <Fragment>
            {biblioteca.map((libro,key)=>(
                <Link key={libro.id} to={`/mostrar/${libro.id}`} >
                    <Libro  libro={libro}></Libro>
                </Link>
            ))
            }
        </Fragment>
    )
}

export default ListadoLibros