import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },

    contacts: {
        flex: 12,
        padding: 5,
        width: '100%'
    },
    contact: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding: 5,
    },
    contactImage: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
    contactText: {
        flex: 1,
        alignSelf: 'center',
        padding: 5,
        fontSize: 20,
    },
    contactSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },

    addbutton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 64,
        height: 64,
        borderRadius: 100,
        backgroundColor: '#7F6DF3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        color: 'white',
        fontSize: 24
    },
    closeButton: {
        backgroundColor: '#FF392B',
        width: '80%',
        borderRadius: 5,
        padding: 10,
        position: 'absolute',
        bottom: 25        
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },

    search: {
        height: 50,
        width: '90%',
        borderRadius: 5,
        borderColor: '#aa22aa22',
        borderWidth: 1,
        margin: 10,
    },

    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        minHeight: Dimensions.get('window').height - 150,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 5,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        width: '100%',
    },
    actions: {
        position: 'absolute',
        top: 10,
        right: 10,
        flex: 1,
        flexDirection: 'row',
    },
    action: {
        width: 42,
        height: 42,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#FF392B'
    },
    userMainInfoContainer: {
        width: '100%',
        flex: 1,
    },
    imageContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },
    userImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    info: {
        width: '100%',
        flex: 2,
        paddingTop: 30,
        paddingLeft: 20,
        borderWidth: 3,
        borderTopWidth: 0,
        borderColor: 'black',
        borderTopRightRadius: 0,
        borderRadius: 5,
        borderTopLeftRadius: 0
    },
    extraInfoText: {
        fontSize: 20,
        marginBottom: 30,
    },
    completeName: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: 'black',
        fontSize: 30,
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 3,
        borderBottomWidth: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3
    },
    call: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    email: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },

    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    formTitle: {
        margin: 20,
        fontSize: 30
    },
    input:{
        borderBottomWidth: 2,
        padding: 5,
        width: '90%',
        borderColor: '#7F6DF3',
        opacity: 0.8,
        marginBottom: 20
    },
    saveButton: {
        backgroundColor: '#7F6DF3',
        position: 'absolute',
        bottom: 80,
        width: '85%',
    },
    formError: {
        color: 'white',
        backgroundColor: '#FF392B',
        borderRadius: 5,
        padding: 5
    }
});

export { styles };