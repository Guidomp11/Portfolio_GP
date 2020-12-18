import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //obtengo las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try{
            const resultado = await clienteAxios.get('/api/tasks', {params: {proyecto}});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        }catch(error){
            console.log(error);
        }
        
    }

    //agregar tarea al proyect oseleccionado
    const agregarTarea = async tarea => {
        try{
            const resultado = await clienteAxios.post('/api/tasks', tarea);
         
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        }catch(error){
            console.log(error);
        }
    }

    //valida y muestra error en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try{
            await clienteAxios.delete('/api/tasks/'+id, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        }catch(error){
            console.log(error);
        }
        
    }

    //edita - modifica la tarea
    const actualizarTarea = async tarea => {

        try{
            const resultado = await clienteAxios.put(`/api/tasks/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            })

        }catch(error){
            console.log(error);
        }

        
    }


    //extrae la tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }
    
    //elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
}

export default TareaState;