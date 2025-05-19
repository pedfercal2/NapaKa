import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const contextoBiblioteca = createContext();
const ProveedorLibros = (props) =>{
    //Navegación de forma programática
    const navegar = useNavigate();

    const [biblioteca, setBiblioteca] = useState([]);
    
    const inicializarBiblioteca = () =>{
        setBiblioteca(coleccion.libros);
    };

    const buscarLibro = (identificador) => {
        const libroBuscado = biblioteca.filter((libro) =>{
            return libro.id === identificador;
        });
        return libroBuscado;
    }
    const insertarLibro = (libroAInsertar) =>{
        setBiblioteca([...biblioteca, libroAInsertar]);
        //Una vez insertado volvemos al inicio
        navegar("/");
    };

    const borrarLibro = (identificador) => {
        //obtenemos los libros a mantener
        const librosAMantener = biblioteca.filter((libro) => {
            return libro.id !== identificador;
        });
        //dado que el set asigna, es el motivo por el cual hemos obtenido los libros que hay que mantener
        setBiblioteca(librosAMantener);
        //después de eliminar volvemos al inicio.
        navegar("/");
    }

    useEffect(() => {
        inicializarBiblioteca();
    }, []);

    const exportacion ={
        biblioteca,
        inicializarBiblioteca,
        buscarLibro,
        insertarLibro,
        borrarLibro,
    };
    return(
        <Fragment>
            <contextoBiblioteca.Provider value={exportacion}>
                {props.children}
            </contextoBiblioteca.Provider>
        </Fragment>
    );
    };
export default ProveedorLibros;
export {contextoBiblioteca};