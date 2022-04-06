import React from 'react';

import { StyleSheet,View ,Text} from 'react-native'
import Color from "../constants/Color"
import TitleText from './TitleText';

const Header = ({title}) => {

    return (
        <View style={styles.header}>
            <TitleText style={styles.title}>{title}</TitleText>
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        textAlign:'center',
        justifyContent:'center',
        color:'yellow',
        width:'100%',
        height:90,
        paddingTop:36,
        backgroundColor:Color.primary,
        alignItems: 'center'
    },
    title: {
        color:'black',
        fontSize:18
    }
})

export default Header;