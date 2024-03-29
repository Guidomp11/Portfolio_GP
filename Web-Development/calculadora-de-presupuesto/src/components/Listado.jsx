import React from 'react';
import Gasto from './Gasto';
import PropType from 'prop-types';

const Listado = ({gastos}) => (
    <div className="gastos-realizados">
        <h2>Listado</h2>
        {gastos.map(gasto => (
            <Gasto 
                key={gasto.id}
                gasto={gasto}
            />
        ))}
    </div>
)
 
Listado.propTypes = {
    gastos: PropType.array.isRequired
}

export default Listado;