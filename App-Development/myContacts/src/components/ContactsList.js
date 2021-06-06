import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const ContactsList = ({contacts, setUser, setModal, showmodal}) => {

    const onContactSelected = (contact) => {
        setUser(contact); 
        setModal(!showmodal);
    }

    const renderItem = ({item}) => {
        return (
        <TouchableOpacity 
            style={styles.contact}
            activeOpacity={1}
            onPress={() => onContactSelected(item)}
        >
            <Image style={styles.contactImage} source={require('../assets/images/user.png')}/>
            <Text style={styles.contactText}>{`${item.name} ${item.lastname}`}</Text>
        </TouchableOpacity>
    )}

    return ( 
        <FlatList 
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => item.name}
        />
    );
}
 
export default ContactsList;