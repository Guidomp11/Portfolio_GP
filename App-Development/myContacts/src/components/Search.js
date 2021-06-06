import React, { useState } from 'react';

import {
    View,
    TextInput,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { styles } from '../styles';

const Search = ({handleSearch}) => {
    return (
        <View style={styles.search}>
            <TextInput placeholder="Buscar contacto" onChangeText={text => handleSearch(text)} />
        </View>
    );
}

export default Search;