import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {

    const {name, main} = resultado;

    if(!name) return null;

    //convertid °kelvin a °C
    const kelvin = 273.15;

    const convertidorCentrigrados = temp => {
        return parseFloat(temp - kelvin, 10).toFixed(1);
    }

    return ( 
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es: </h2>
                <p className="temperatura">
                    {convertidorCentrigrados(main.temp)} <span> &#x2103; </span>
                </p>

                <p>Temperatura Maxima: 
                    {convertidorCentrigrados(main.temp_max)} <span> &#x2103; </span>
                </p>
                <p>Temperatura Minima: 
                    {convertidorCentrigrados(main.temp_min)} <span> &#x2103; </span>
                </p>
            </div>
        </div>
    );
}
 
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Clima;