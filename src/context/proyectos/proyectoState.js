import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types'; //Como el archivo se llama index.js no necesito especificarlo
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones, nuevo hook
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Se agregan las funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectos = async () => {

        try {

            const resultado = await clienteAxios.get("/api/proyectos");
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            });

        } catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: "alerta-error"
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    const agregarProyecto = async proyecto => {
        
        try {
            const resultado = await clienteAxios.post("/api/proyectos", proyecto);
            //insertamos el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: "alerta-error"
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }

    }

    //valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    const eliminarProyecto = async proyectoId => {

        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: "alerta-error"
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
        
    }

    return (
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
    )
}

export default ProyectoState;