import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    //state del form
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });


    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);


    const {nombre} = tarea;

    if(!proyecto) return null;

    //Array destructuring
    const [proyectoActual] = proyecto;

    //leer los valores del form
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //revisar si es edicion o nueva tarea
        if(tareaseleccionada === null){
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea);
            limpiarTarea();
        }        

        obtenerTareas(proyectoActual._id);

        guardarTarea({
            nombre: ''
        });
    }


    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}
 
export default FormTarea;