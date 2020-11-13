import React from 'react';
import PropType from 'prop-types';

const Gasto = ({gasto}) => (
    <li className="gastos">
        <p>
            {gasto.nombregasto}

            <span className="gasto">$ {gasto.cantidad}</span>
        </p>
    </li>
)
 
Gasto.propTypes = {
    gasto: PropType.object.isRequired
}

export default Gasto;