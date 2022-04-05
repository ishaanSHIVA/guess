import React from 'react';

import { StyleSheet,View ,Text} from 'react-native'

const Header = ({title}) => {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
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
        backgroundColor:'#f7287b',
        alignItems: 'center'
    },
    title: {
        color:'black',
        fontSize:18
    }
})

export default Header;