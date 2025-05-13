import { Fragment } from "react";

function Libro ({libro}) {
    
    return(
        <Fragment>
            <div id={libro.id}>
            <h3>
                título: {libro.titulo} 
            </h3>
            <p>
                autor: {libro.autor}
            </p>
            <img  src={libro.portada}>
                
            </img>
            
            </div>
        </Fragment>
);

}

export default Libro;