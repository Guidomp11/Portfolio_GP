import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario/Formulario.jsx';
import ListadoNoticias from './components/ListadoNoticias.jsx';

function App() {

  //definir la categoria y noticias
  const [categoria, guardarCategoria] = useState('');
  const [noticias, guardarNoticias] = useState([]);


  useEffect(() => {
    const consultarAPI = async () => {
      const apiKEY = '4ad9426c0f814fa0b3bf656e739069c2';
      const url = `http://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&apiKey=${apiKEY}`;

      const respuesta = await fetch(url);
      const noticias = await respuesta.json();

      guardarNoticias(noticias.articles);
    }

    consultarAPI();
  }, [categoria])

  return (
    <Fragment>
      <Header titulo="Buscador de Noticias"/>

      <div className="container white">
        <Formulario 
          guardarCategoria={guardarCategoria}
        /> 

        <ListadoNoticias 
          noticias={noticias}
        />
      </div>
    </Fragment>
  );
}

export default App;
