import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idreceta, guardarIdReceta] = useState(null);
    const [detallereceta, guardarDetalleReceta] = useState({});

    useEffect(() => {
        const consultarReceta = async () => {
            if(!idreceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`

            const resultado = await axios.get(url);

            guardarDetalleReceta(resultado.data.drinks[0]);
        }
        consultarReceta();
    }, [idreceta])

    return(
        <ModalContext.Provider
            value={{
                detallereceta,
                guardarIdReceta,
                guardarDetalleReceta                
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;