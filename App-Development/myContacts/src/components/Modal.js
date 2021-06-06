import React from 'react';
import { View, Modal, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { styles } from '../styles';

const MyModal = ({children, visible}) => {

    return (
        <Modal
            animationType="fade"
            trasparent={true}
            visible={visible}
            avoidKeyboard={false}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
}
 
export default MyModal;