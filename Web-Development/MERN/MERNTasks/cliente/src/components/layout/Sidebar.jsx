import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

const Sidebar = () => {
    return (  
        <aside>
            <h1>
                MERN<span>Tasks</span>
                
                <NuevoProyecto />
                
                <div className="proyectos">
                    <h2>Tus proyectos</h2>
                    <ListadoProyectos />
                </div>
            </h1>
        </aside>
    );
}
 
export default Sidebar;