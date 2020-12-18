import React, { Fragment, useContext } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTarea = () => {
    
    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array destructuring
    const [proyectoActual] = proyecto;


    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id);
    }

    return (  
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?
                        (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                        <TransitionGroup>
                            {tareasproyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={700}
                                    classNames="tarea"
                                >
                                    <Tarea 
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTarea;