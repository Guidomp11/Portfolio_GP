import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({busqueda, guardarBusqueda, guardarConsulta}) => {

    const [error, guardarError] = useState(false);

    const {ciudad, pais} = busqueda;

    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //pasar al componente principal
        guardarConsulta(true);
    }

    return (  
        <form
            onSubmit={handleSubmit}
        >
            {error ? 
                <Error mensaje="Todos los campos son obligatorios"/>
            :
                null
            }
            <div className="input-filed col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
            </div>

            <div className="input-filed col s12">
                <select
                    name="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
            </div>

            <div className="input-filed col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                >Buscar Clima</button>
            </div>
        </form>
    );
}
 
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired, 
    guardarConsulta: PropTypes.func.isRequired
}

export default Formulario;