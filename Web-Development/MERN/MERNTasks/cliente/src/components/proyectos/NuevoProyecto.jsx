import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, mostrarFormulario, errorformulario, agregarProyecto, mostrarError} = proyectosContext;


    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const {nombre} = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        if(nombre === ''){
            mostrarError();
            return;
        }
        //agrego proyecto al state
        agregarProyecto(proyecto);
        //reiniciar formulario
        guardarProyecto('');
    }

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>

            {formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >   
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre del Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                ) : null
            }

            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>
    );
}
 
export default NuevoProyecto;