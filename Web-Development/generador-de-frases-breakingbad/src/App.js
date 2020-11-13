import React, {useState, useEffect} from 'react';
import Frase from './components/Frase';

import styled from '@emotion/styled';

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font.family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .8s ease;

  :hover{
    cursor: pointer;
    background-size: 400px;
  }
`;

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

function App() {

  const [frase, guardarFrase] = useState({
    author: '',
    quote: ''
  });

  const consultarAPI = async () => {
    const resultado = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes')
    const fraseJSON = await resultado.json();

    guardarFrase(fraseJSON[0]);
  }

  useEffect( () => {
    consultarAPI()
  }, []);

  return (
    <Contenedor>
      <Frase 
        frase={frase}
      />

      <Boton
        onClick={consultarAPI}
      >
        Obtener Frase
      </Boton>
    </Contenedor>
  );
}

export default App;
