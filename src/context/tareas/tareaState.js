import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [
            { id: 1, nombre: "Tarea 1", estado: true, proyectoId: 1 },
            { id: 2, nombre: "Tarea 2", estado: false, proyectoId: 2 },
            { id: 3, nombre: "Tarea 3", estado: true, proyectoId: 3 },
            { id: 4, nombre: "Tarea 1", estado: true, proyectoId: 1 },
            { id: 5, nombre: "Tarea 2", estado: false, proyectoId: 2 },
            { id: 6, nombre: "Tarea 3", estado: true, proyectoId: 3 },
            { id: 7, nombre: "Tarea 1", estado: true, proyectoId: 1 },
            { id: 8, nombre: "Tarea 2", estado: false, proyectoId: 2 },
            { id: 9, nombre: "Tarea 3", estado: true, proyectoId: 3 }
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch y State
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Funciones

    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    }

    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;