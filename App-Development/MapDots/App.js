import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { Map,   Modal, Panel, Input, List } from './components';

export default function App() {

  //puntos guardados
  const [puntos, setPuntos] = useState([]);

  //nombre del punto
  const [nombre, setNombre] = useState('');

  //punto temporal
  const [puntoTemp, setPuntoTemp] = useState({});

  //visibilidad del modal
  const [visibility, setVisibility] = useState(false);

  const [visibilityfilter, setVisibilityFilter] = useState('nuevo_punto');//nuevo_punto || todos_los_puntos

  //mostrar o no los puntos en el mapa
  const [pointsfilter, setPointsFilter] = useState(true);

  
  const toglePointsFilter = () => setPointsFilter(!pointsfilter);

  const handleLongPress = ({ nativeEvent }) => {
    setVisibilityFilter('nuevo_punto');
    setPuntoTemp(nativeEvent.coordinate);//guardamos temporalmente el punto para pedir un nombre luego
    setVisibility(true);//activamso el modal para darle nombre al punto
  }

  const handleChangeText = text => {
    setNombre(text);
  }

  const handleSumbit = () => {
    const newPunto = {
      name: nombre,
      coordinate: puntoTemp
    }

    setPuntos(puntos.concat(newPunto))
    setVisibility(false);
    setNombre('');
  }

  const handleList = () => {
    setVisibilityFilter('todos_los_puntos');
    setVisibility(true);
  }

  return (
    <View style={styles.container}>

      <Map 
        onLongPress={handleLongPress}
        puntos={puntos}
        pointsFilter={pointsfilter}
      />

      <Panel 
        onPressLeft={handleList}
        textLeft="List"
        toglePointsFilter={toglePointsFilter}
      />

      <Modal visibility={visibility} >
        {visibilityfilter === 'nuevo_punto'
          ? 
            <View style={styles.form}>
              <Input title="Name" placeholder="Dot name" onChangeText={handleChangeText}/>
              <Button title="Accept" onPress={handleSumbit} />
              <TouchableOpacity style={styles.button} onPress={() => setVisibility(false)} ><Text style={styles.text} >Cancel</Text></TouchableOpacity>
            </View> : 
            <>
              <List 
                puntos={puntos}
                closeModal={() => setVisibility(false)}
              />
            </>
        }
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    padding: 20,
    height: Dimensions.get('window').height / 4,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2
  },
  text: {
    color: 'white',
    textTransform: 'uppercase'
  }
});
