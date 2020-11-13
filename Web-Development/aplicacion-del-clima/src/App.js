import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsulta] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  
  const {ciudad, pais} = busqueda;

  

  useEffect(() => {
    
    const consultarAPI = async () => {
      if(consultar){
        const apiKey = 'd3719073b3da1e853e8f67f9ce255e74';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json(); 
        
        guardarResultado(resultado);
        guardarConsulta(false);

        if(resultado.cod === '404'){
          guardarError(true);
        }else{
          guardarError(false);
        }
      }
    }
    consultarAPI();


    //deshabilita el error por falta de dependencias cuando uno es consciente de que los hay pero sabe que no son necesarios
    // eslint-disable-next-line
  }, [ciudad, pais, consultar])

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header
        titulo='Clima React'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
