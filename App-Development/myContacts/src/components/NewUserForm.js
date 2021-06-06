import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { storeContact, getContacts } from '../storage';
import { validateNewUser } from '../functions/validation';
import { styles } from '../styles';

const NewUserForm = ({closeModal, setContacts, contactsstate}) => {

    const [newuser, setNewUser] = useState({
        name: '',
        lastname: '',
        phone: '',
        cellphone: '',
        email: ''
    });

    const [error, setError] = useState(null);

    const {name, lastname, phone, callphone, email} = newuser;

    const onContactSubmit = async () => {
        if(validateNewUser([name, lastname])){
            const app_contacts = await getContacts('@contacts');
            app_contacts.push(newuser);

            await storeContact('@contacts', app_contacts);
            setContacts(app_contacts);
            closeModal();
            return;
        }
        setError({msg: 'Debe completar los campos de Nombre y Apellido'});
    }

    return (
        <View style={styles.form}>
            {error ? (<Text style={styles.formError}>{error.msg}</Text>) : null}

            <Text style={styles.formTitle}>Nuevo Contacto</Text>

            <TextInput style={styles.input} placeholder="Nombre" onChangeText={text => setNewUser({...newuser, name: text})} />
            <TextInput style={styles.input} placeholder="Apellido" onChangeText={text => setNewUser({...newuser, lastname: text})} />

            <TextInput style={styles.input} placeholder="Telefono" onChangeText={text => setNewUser({...newuser, phone: text})} />
            <TextInput style={styles.input} placeholder="Celular" onChangeText={text => setNewUser({...newuser, cellphone: text})} />
            <TextInput style={styles.input} placeholder="E-mail" onChangeText={text => setNewUser({...newuser, email: text})} />
        
            <TouchableOpacity
                style={{...styles.closeButton, ...styles.saveButton}}
                activeOpacity={0.8}
                onPress={onContactSubmit}
            >
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}
 
export default NewUserForm;