import React from 'react';

import { StyleSheet,View ,Platform} from 'react-native'
import Color from "../constants/Color"
import TitleText from './TitleText';

const Header = ({title}) => {

    return (
        <View style={{...styles.headerBase,...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid
        })}}>
            <TitleText style={styles.title}>{title}</TitleText>
        </View>
    )

}

const styles = StyleSheet.create({
    headerBase: {
        textAlign:'center',
        justifyContent:'center',
        color:'yellow',
        width:'100%',
        height:90,
        paddingTop:36,
        alignItems: "center",
    },
    headerAndroid: {
        backgroundColor:Color.primary,
    },
    headerIOS: {
        backgroundColor:'white',
        borderBottomColor: "#ccc",
        borderBottomWidth:1
    },
    title: {
        color: Platform.OS === 'ios' ? Color.primary : "white",
        fontSize:18
    }
})

export default Header;