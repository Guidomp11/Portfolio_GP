import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';

import Contact from './screens/Contacts';

export default App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Contact />
    </SafeAreaView>
  );
}
