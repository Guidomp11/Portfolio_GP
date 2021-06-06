import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeContact = async (key, value) => {
    try{
        const string_contact = JSON.stringify(value);
        await AsyncStorage.setItem(key, string_contact);
    }catch(e){
        console.log('Error: ', e);
    }
}

export const getContacts = async (key='default') => {
    try{
        const string_contact = await AsyncStorage.getItem(key);
        return JSON.parse(string_contact) || [];
    }catch(e){
        console.log('Error: ', e);
    }
}

export const removeContact = async (key='default', uuid) => {
    try{
        let contacts = await getContacts(key);

        contacts = contacts.filter(contact => contact.id !== uuid);

        await storeContact('@contacts', contacts);
    }catch(e){
        console.log('Error: ', e);
    }
}

export const cleanStorage = async (key) => {
    try{
        await AsyncStorage.removeItem(key)
    }catch(e){
        console.log("ERR: ", e);
    }
}