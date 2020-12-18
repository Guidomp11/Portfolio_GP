import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO, 
    VALIDAR_FORMULARIO, 
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';
import clientAxios from '../../config/axios';



const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecturar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos
    const obtenerProyectos = async () => {
        try{
            const resultado = await clienteAxios.get('/api/proyects')

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data//aca van los params que tenga la funcion
            });
        }catch(error){

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        
        try{
            const resultado = await clienteAxios.post('/api/proyects', proyecto);
            
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        }catch(error){

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //valida formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //selecciona el proyecto que el usuario dio click
    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    }

    //eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        try{
            await clientAxios.delete(`/api/proyects/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        }catch(error){

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
}

export default ProyectoState;