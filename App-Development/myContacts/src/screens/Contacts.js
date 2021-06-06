import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import AddButton from '../components/AddButton';
import Modal from '../components/Modal';
import NewUserForm from '../components/NewUserForm';
import Search from '../components/Search';
import UserExtraInfo from '../components/UserExtraInfo';
import ContactsList from '../components/ContactsList';
import { getContacts, cleanStorage } from '../storage';
import { styles } from '../styles';

const Contacts = () => {

    const [showmodal, setModal] = useState(false);
    const [search, handleSearch] = useState('');
    const [contactsstate, setContacts] = useState([]);
    const [userselected, setUser] = useState(null);
    const [showform, setShowForm] = useState(false);

    const onAddSelection = () => {
        setModal(!showmodal);
        setShowForm(true);
    }

    const closeModal = () => { 
        setModal(!showmodal);
        setShowForm(false);
    }

    useEffect(async () => {
        if(search.trim() === ''){
            await findOnStorage();
        }else{
            filterContacts();
        }    
    }, [search])


    const filterContacts = () => {
        if(search.trim() == ''){
            setContacts(sortContacts(contactsstate));
            return;
        }
        const contacts_filtered = contactsstate.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()) || contact.lastname.toLowerCase().includes(search.toLowerCase()));
        setContacts(sortContacts(contacts_filtered));
        return;
    }

    const findOnStorage = async () => {
        //await cleanStorage('@contacts');
        const storage_contacts = await getContacts('@contacts');
        setContacts(storage_contacts);
    }

    const sortContacts = (arrayToSort) => {
        return arrayToSort.sort(function(a,b){
            if(a.name< b.name) return -1;
            if(a.name >b.name) return 1;
            if(a.lastname< b.lastname) return -1;
            if(a.lastname >b.lastname) return 1;
            return 0;
        });
    }
    

    return (
        <View style={styles.container}>
            <Search handleSearch={handleSearch} />

            <View style={styles.contacts}>
                <ContactsList 
                    contacts={contactsstate}
                    showmodal={showmodal}
                    setModal={setModal}
                    setUser={setUser}
                />

                <Modal
                    visible={showmodal}
                    info={userselected}
                >
                    {
                        showform ? 
                        (<NewUserForm closeModal={closeModal} setContacts={setContacts} contactsstate={contactsstate} />)
                        :
                        (<UserExtraInfo info={userselected} />)
                    }

                    <TouchableOpacity
                        style={styles.closeButton}
                        activeOpacity={0.8}
                        onPress={() => closeModal()}
                    >
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </Modal>

                <AddButton action={onAddSelection}/>
            </View>
        </View>
    );
}
 
export default Contacts;