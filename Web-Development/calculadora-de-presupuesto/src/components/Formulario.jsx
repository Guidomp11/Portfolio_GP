import React, {useState} from 'react'
import Error from './Error';
import shortid from 'shortid';
import PropType from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombregasto, guardarNombreGasto] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = event => {
        event.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || nombregasto.trim() === ''){
            guardarError(true);
            return;
        }else{
            guardarError(false);
        }

        const gasto = {
            id: shortid.generate(),
            nombregasto, 
            cantidad            
        }

        //pasar nuevo gasto al componente padre
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombreGasto('');
        guardarCantidad(0);

    }


    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}

            <div className="campo">
                <label>Nombre del Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombregasto}
                    onChange={event => guardarNombreGasto(event.target.value)}
                />
                <label>Cantidad del gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={event => guardarCantidad(parseInt(event.target.value))}
                />

                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar gasto"
                />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropType.func.isRequired,
    guardarCrearGasto: PropType.func.isRequired
}

export default Formulario;