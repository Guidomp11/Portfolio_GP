import React from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { removeContact } from '../storage';
import { styles } from '../styles';

const UserExtraInfo = ({info}) => {

    const createAlert = (id) => {
        Alert.alert(
            "Confirmar eliminacion.",
            "Si eliminas el contacto, no lo podras recuperar.",
            [
                {
                    text: 'Cancelar'
                },{
                    text: 'Aceptar',
                    onPress: () => removeContact('@contacts', id)
                }
            ]
        );
    }

    const makeAction = (phone_number) => {
        Linking.canOpenURL(phone_number)
        .then(supported => {
            if(supported){
                return Linking.openURL(phone_number);
            }else{
                Alert.alert('Error de llamada.');
            }
        })
        .catch(error => Alert.alert('Error de llamada.'))
    }

    return (
        <View style={styles.infoContainer}>
            <View style={styles.userMainInfoContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.userImage} source={require('../assets/images/user.png')} />
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => createAlert(info.id)}
                    >
                        <Image style={styles.action} source={require('../assets/images/trash.png')}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.completeName}>{info.name} {info.lastname}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.extraInfoText}>
                    Telefono: {info.phone}
                    {
                        info.phone &&
                        <TouchableOpacity
                            onPress={() => makeAction(info.phone)}
                        >
                            <Image style={styles.call} source={require('../assets/images/call.png')}/>
                        </TouchableOpacity>
                    }
                </Text>
                <Text style={styles.extraInfoText}>
                    Celular: {info.cellphone}
                    {
                        info.cellphone &&
                        <TouchableOpacity
                            onPress={() => makeAction(info.cellphone)}
                        >
                            <Image style={styles.call} source={require('../assets/images/call.png')}/>
                        </TouchableOpacity>
                    }
                </Text>
                <Text style={styles.extraInfoText}>
                    E-mail: {info.email}
                    {
                        info.email &&
                        <TouchableOpacity
                            onPress={() => makeAction(`mailto:${info.email}`)}
                        >
                            <Image style={styles.email} source={require('../assets/images/email.png')}/>
                        </TouchableOpacity>
                    }
                </Text>
            </View>
        </View>
    );
}
 
export default UserExtraInfo;