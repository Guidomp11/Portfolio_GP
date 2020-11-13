import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner/Spinner';
import Axios from 'axios';

import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, guardarCarga] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);
      
      guardarCarga(true);
      setTimeout(() => {
        guardarCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      
        guardarCarga(false);
      }, 3000);
      
    }

    cotizarCriptomoneda();
    
  }, [moneda, criptomoneda]);

  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion cotizacion={cotizacion}/>


  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen cripto"
        />
      </div>
      <div>
        <Heading>
          Cotiza criptomonedas al Instante
        </Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
