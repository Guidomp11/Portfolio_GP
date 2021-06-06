import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import { styles } from '../styles';


const AddButton = ({action}) => {
    return (
        <TouchableOpacity
            style={styles.addbutton}
            activeOpacity={0.8}
            onPress={() => action()}
        >
            <Text style={styles.buttonIcon}>+</Text>
        </TouchableOpacity>
    );
}
 
export default AddButton;