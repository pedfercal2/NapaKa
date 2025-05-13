import React, {Fragment, useContext} from "react";
import LibroDetalles from "../LibroDetalles";
import { contextoBiblioteca } from "../../contextos/ProveedorLibros";
import { useParams } from "react-router-dom";

const Mostrar = () => {

    const {buscarLibro} =useContext(contextoBiblioteca);
    
    const {identificador} = useParams();

    const libroFiltrado = buscarLibro(identificador);

    return (
        <Fragment>
            <LibroDetalles libroBuscado={libroFiltrado[0]} />
        </Fragment>
    );

};

export default Mostrar;