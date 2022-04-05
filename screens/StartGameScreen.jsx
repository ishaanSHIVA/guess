import React from 'react';
import {StyleSheet ,View ,Text} from 'react-native'


const StartGameScreen = () => {
    return (

                    <View styles={styles.startGameScreen}>
        <Text>The Game Screen</Text>
    </View>
        )

}

const styles = StyleSheet.create({
    startGameScreen: {
        flex:1,
        padding:10,
        alignItems: 'center',

    }
})

export default StartGameScreen;