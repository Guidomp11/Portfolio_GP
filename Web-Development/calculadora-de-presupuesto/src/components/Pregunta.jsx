import React, {Fragment, useState} from 'react';
import Error from './Error';
import PropType from 'prop-types';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //definir el state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //funcion que lee el presupuesto
    const definirPresupuesto = evento => {
        guardarCantidad(parseInt(evento.target.value, 10));
    }

    //submit para definir el presupuesto
    const agregarPresupuesto = evento => {
        evento.preventDefault();

        if(cantidad < 1 || isNaN(cantidad)){//isNan en caso de no ser numero, entra.
            guardarError(true);
            return;
        }else{
            guardarError(false);
            guardarPresupuesto(cantidad);
            guardarRestante(cantidad);
            actualizarPregunta(false);
        }
    }

    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            {error ? <Error mensaje="El presupuesto es incorrecto" /> : null}
            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropType.func.isRequired,
    guardarRestante: PropType.func.isRequired,
    actualizarPregunta: PropType.func.isRequired
}

export default Pregunta;