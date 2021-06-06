import React from 'react';
import { Dimensions, StyleSheet, Button, View } from 'react-native';

export default ({ onPressLeft, textLeft, toglePointsFilter }) => {
    return(
        <View
            style={styles.panel}
        >
            <Button 
                title={textLeft}
                onPress={onPressLeft}
            />

            <Button 
                title="Show/Hide"
                onPress={toglePointsFilter}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    panel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 200,
        position: 'absolute',
        bottom: 20
    }
});