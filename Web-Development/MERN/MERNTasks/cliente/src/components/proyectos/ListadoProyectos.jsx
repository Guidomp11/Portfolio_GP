import React, {useContext, useEffect} from 'react';

import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Proyecto from './Proyecto';

import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {

        //si hay error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();

        // elint-disable-next-line
    }, [mensaje])

    //reviso si proyectos tiene contenido
    if(proyectos.length === 0) return <em>No hay proyectos</em>;
    
    return (  
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={700}
                        classNames="proyecto"
                    >
                        <Proyecto     
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;