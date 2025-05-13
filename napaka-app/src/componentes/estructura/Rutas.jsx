import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../paginas/Inicio.jsx";
import CrearLibro from "../paginas/CrearLibro.jsx";
import Mostrar from "../paginas/Mostrar.jsx";


const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/crear' element={<CrearLibro />} />
        <Route path='/mostrar/:identificador' element={<Mostrar />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;