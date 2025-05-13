import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Navegacion = () => {
  return (
    <Fragment>
      <nav className='menu'>
        <ul className='menu__list'>

          <li className='menu__item'>
            <NavLink to='/' >
                Inicio
              </NavLink>
          </li>

          <li className='menu__item'>
            <NavLink to='/crear' >
              Crear
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navegacion;
