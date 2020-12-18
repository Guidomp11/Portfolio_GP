import React, {useContext} from 'react';

import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const [proyectoActual] = proyecto;

    //eliminar tarea
    const tareaAEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    //modificacion de estaod en tarea
    const modificarEstado = tareaActual => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tareaActual);
    }

    //agregar una tarea actual al tocar editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (  
        <li className="tarea sombra">
            {tarea.nombre}

            <div className="estado">
                {tarea.estado 
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => modificarEstado(tarea)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => modificarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaAEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;