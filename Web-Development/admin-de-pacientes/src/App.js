import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use effect para realizar operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] )

  //funcion que agregue nuevas citas
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina una cita
  const eliminarCita = citaID => {
    const citasActualizadas = citas.filter(elemento => (elemento.id !== citaID) );
    guardarCitas(citasActualizadas);
  }

  //Mensaje condicional
  const tieneCitas = citas.length === 0 ? 'No hay citas' : 'Administra tus citas' ;

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
                <h2>{tieneCitas}</h2>
                {citas.map(cita => (
                  <Cita 
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
